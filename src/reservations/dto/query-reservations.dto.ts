import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { FindManyDto } from './../../utils/dto/find-many.dto';
import { Transform } from 'class-transformer';

export class QueryReservationsDto extends OmitType(FindManyDto, ['include', 'searchBy', 'filter'] as const) {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        default: 'createdAt',
        description:
            'Can only be one of the fields: id, startedAt, finishedAt, cancelledNotes, customerNotes, status, createdAt, updatedAt, customerId, and tableId',
    })
    orderBy?: string = 'createdAt';

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: `The system automatically filter by 'name of customer' and 'name of table' if this params is not empty`,
    })
    search?: string = undefined;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        default: 'cancelledNotes, customerNotes, status',
        description: 'Can only be a combination of fields: name and email',
    })
    searchBy?: string;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({ enum: ['true', 'false'] })
    @Transform(({ value }) => ['true', '1', true, 1].includes(value))
    includeCustomer?: string;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({ enum: ['true', 'false'] })
    @Transform(({ value }) => ['true', '1', true, 1].includes(value))
    includeTable?: string;
}
