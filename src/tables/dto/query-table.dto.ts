import { PickType } from '@nestjs/swagger';
import { QueryTablesDto } from './query-tables.dto';

export class QueryTableDto extends PickType(QueryTablesDto, ['includeReservations']) {}
