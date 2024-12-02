import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { PrismaService } from 'src/common/prisma.service';

@Module({
    controllers: [ReservationsController],
    providers: [ReservationsService, PrismaService],
})
export class ReservationsModule {}