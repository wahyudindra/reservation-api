import { IsOptional } from 'class-validator';

export class FindOneDto {
    @IsOptional()
    include?: any;

    @IsOptional()
    select?: any;
}
