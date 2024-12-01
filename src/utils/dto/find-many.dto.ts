import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindManyDto {
    filter?: any;
    include?: any;
    select?: any;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({ default: 1 })
    page?: number = 1;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({ default: 10 })
    take?: number = 10;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ default: 'createdAt' })
    orderBy?: string = 'createdAt';

    @IsOptional()
    @IsEnum(Prisma.SortOrder)
    @ApiPropertyOptional({ enum: Prisma.SortOrder, default: 'desc' })
    sortBy?: Prisma.SortOrder = 'desc';

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    search?: string = undefined;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'Search only for string data type.' })
    searchBy?: string;
}
