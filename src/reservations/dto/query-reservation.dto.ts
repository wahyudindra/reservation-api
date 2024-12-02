import { PickType } from '@nestjs/swagger';
import { QueryReservationsDto } from './query-reservations.dto';

export class QueryReservationDto extends PickType(QueryReservationsDto, ['includeCustomer', 'includeTable']) {}
