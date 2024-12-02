import { PickType } from '@nestjs/swagger';
import { QueryCustomersDto } from './query-customers.dto';

export class QueryCustomerDto extends PickType(QueryCustomersDto, ['includeReservations']) {}
