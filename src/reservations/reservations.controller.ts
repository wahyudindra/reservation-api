import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { QueryReservationsDto } from './dto/query-reservations.dto';
import { ReservationsService } from './reservations.service';
import { Authorize, Public } from 'src/auth/decorators/auth.decorator';
import { QueryReservationDto } from './dto/query-reservation.dto';
import { CancelledReservationDto } from './dto/cancelled-reservation.dto';
import { SetStatusReservationDto } from './dto/set-status-reservation.dto';

@Authorize()
@ApiBearerAuth()
@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    @Get()
    findAll(@Query() query: QueryReservationsDto) {
        return this.reservationsService.findReservations(query);
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number, @Query() query: QueryReservationDto) {
        return this.reservationsService.findReservation(id, query);
    }

    @Post()
    @Public()
    create(@Body() data: CreateReservationDto) {
        return this.reservationsService.createReservation(data);
    }

    @Put(':id/:status')
    setStatus(@Param() { id, status }: SetStatusReservationDto, @Body() data: CancelledReservationDto) {
        return this.reservationsService.setStatus(id, status, data);
    }
}
