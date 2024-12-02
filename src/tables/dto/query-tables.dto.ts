import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { FindManyDto } from './../../utils/dto/find-many.dto';
import { Transform } from 'class-transformer';

export class QueryTablesDto extends OmitType(FindManyDto, ['include', 'searchBy', 'filter'] as const) {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        default: 'createdAt',
        description: 'Can only be one of the fields: id, name, qty, isActive, createdAt, and updatedAt',
    })
    orderBy?: string = 'createdAt';

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        default: 'name',
        description: 'Can only be a combination of fields: name',
    })
    searchBy?: string;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({ enum: ['true', 'false'] })
    @Transform(({ value }) => ['true', '1', true, 1].includes(value))
    includeReservations?: string;
}
