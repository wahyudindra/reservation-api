import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { FindManyDto } from './../../utils/dto/find-many.dto';

export class QueryUsersDto extends OmitType(FindManyDto, ['include', 'searchBy', 'filter'] as const) {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        default: 'createdAt',
        description: 'Can only be one of the fields: id, name, email, createdAt, and updatedAt',
    })
    orderBy?: string = 'createdAt';

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        default: 'name,email',
        description: 'Can only be a combination of fields: name and email',
    })
    searchBy?: string;
}
