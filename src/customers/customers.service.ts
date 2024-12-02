import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { BaseRepository } from 'src/utils/base-repository';
import { QueryCustomersDto } from './dto/query-customers.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
import * as dayjs from 'dayjs';
import { isBoolean } from 'class-validator';

@Injectable()
export class CustomersService extends BaseRepository {
    constructor(private prisma: PrismaService) {
        super(prisma, Prisma.ModelName.Customer);
    }

    findCustomers(query: QueryCustomersDto) {
        const select = this.constructSelect(query);
        return super.findAll({ ...query, select });
    }

    findCustomer(id: number, query: QueryCustomerDto) {
        const select = this.constructSelect(query);
        return super.findOne(id, { select });
    }

    async updateCustomer(id: number, { isBlocked, ...data }: UpdateCustomerDto) {
        const customerData: Prisma.CustomerUpdateInput = {
            ...data,
            ...(isBoolean(isBlocked) && { blockedAt: isBlocked ? dayjs().toDate() : null }),
        };

        return super.update(id, customerData);
    }

    constructSelect({ includeReservations }: QueryCustomerDto): Prisma.CustomerSelect {
        return {
            id: true,
            name: true,
            email: true,
            blockedAt: true,
            createdAt: true,
            updatedAt: true,
            reservations: !!includeReservations,
        };
    }
}
