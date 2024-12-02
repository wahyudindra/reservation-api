import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { BaseRepository } from 'src/utils/base-repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { QueryReservationsDto } from './dto/query-reservations.dto';
import { QueryReservationDto } from './dto/query-reservation.dto';
import { ErrorMessage } from 'src/common/constants/error-message';
import * as dayjs from 'dayjs';
import { ReservationStatus } from 'src/common/constants/enum-of-reservation';

@Injectable()
export class ReservationsService extends BaseRepository {
    constructor(private prisma: PrismaService) {
        super(prisma, Prisma.ModelName.Reservation);
    }

    findReservations(query: QueryReservationsDto) {
        const include = this.constructInclude(query);
        return super.findAll({ ...query, include });
    }

    findReservation(id: number, query: QueryReservationDto) {
        const include = this.constructInclude(query);
        return super.findOne(id, { include });
    }

    async createReservation({ startedAt, customerNotes, seatCount, ...customerData }: CreateReservationDto) {
        await this.validateStartedAt(startedAt);
        const customer = await this.prisma.customer.upsert({
            where: { email: customerData.email },
            update: customerData,
            create: customerData,
        });
        if (customer.blockedAt) {
            throw new BadRequestException(ErrorMessage.EMAIL_BLOCKED);
        }

        const reservationData: Prisma.ReservationUncheckedCreateInput = {
            seatCount,
            customerNotes,
            startedAt,
            finishedAt: dayjs(startedAt).add(2, 'hour').toDate(),
            customerId: customer.id,
            tableId: await this.getTableId(startedAt, seatCount),
            status: ReservationStatus.CONFIRMED,
        };

        // TODO: send mail after reservation created
        return super.create(reservationData);
    }

    async validateStartedAt(startedAt: Date) {
        const config = await this.prisma.config.findFirst();
        if (!config) {
            throw new InternalServerErrorException();
        } else if (config.daysOff.filter((v) => dayjs(startedAt).startOf('date').isSame(v)).length) {
            throw new BadRequestException(ErrorMessage.RESTAURANT_IS_CLOSED_ON_THAT_DAY);
        }

        const [openedHour, openedMin] = config.openedAt.split(':');
        const [closedHour, closedMin] = config.closedAt.split(':');
        const openedTime = dayjs(startedAt)
            .startOf('day')
            .set('hour', parseInt(openedHour))
            .set('minute', parseInt(openedMin));
        const closedTime = dayjs(startedAt)
            .startOf('day')
            .set('hour', parseInt(closedHour))
            .set('minute', parseInt(closedMin))
            .add(-119, 'minute'); // close order 2 hour before close
        if (
            !(
                dayjs(startedAt).isSame(openedTime) ||
                (dayjs(startedAt).isAfter(openedTime) && dayjs(startedAt).isBefore(closedTime))
            )
        ) {
            throw new BadRequestException(
                `Restaurant open at ${config.openedAt} - ${config.closedAt}. And the last order is taken 2 hours before closing.`,
            );
        }
    }

    async getTableId(startedAt: Date, seatCount: number): Promise<number> {
        console.log(dayjs(startedAt).add(-2, 'hour').toDate());
        console.log(dayjs(startedAt).add(2, 'hour').toDate());
        const availableTable = await this.prisma.table.findFirst({
            where: {
                qty: { gte: seatCount },
                OR: [
                    { reservations: { none: {} } },
                    {
                        reservations: {
                            none: {
                                startedAt: {
                                    gt: dayjs(startedAt).add(-2, 'hour').toDate(),
                                    lt: dayjs(startedAt).add(2, 'hour').toDate(),
                                },
                            },
                        },
                    },
                ],
                // none: {
                //     startedAt: {
                //         gte: dayjs(startedAt)
                //             .add(-(2 * 60 - 1), 'minute')
                //             .toDate(),
                //     },
                //     finishedAt: {
                //         lte: dayjs(startedAt)
                //             .add(2 * 60 - 1, 'minute')
                //             .toDate(),
                //     },
                // },
            },
            orderBy: { qty: 'asc' },
            include: {
                reservations: {
                    where: {
                        startedAt: {
                            gt: dayjs(startedAt).add(-2, 'hour').toDate(),
                            lte: dayjs(startedAt).add(2, 'hour').toDate(),
                        },
                    },
                },
            },
        });

        console.log(availableTable);
        if (!availableTable) {
            throw new BadRequestException(ErrorMessage.TABLE_FULL_BOOKED);
        }

        return availableTable.id;
    }

    constructInclude({ includeCustomer, includeTable }: QueryReservationDto): Prisma.ReservationInclude {
        return {
            customer: !!includeCustomer,
            table: !!includeTable,
        };
    }
}
