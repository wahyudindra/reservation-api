import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCustomerDto {
    @IsString()
    @IsOptional()
    @MaxLength(100)
    @ApiPropertyOptional({ default: 'customer 1' })
    name?: string;

    @IsEmail()
    @IsOptional()
    @MaxLength(100)
    @ApiPropertyOptional({ default: 'customer1@rsv.id' })
    email?: string;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    isBlocked?: boolean;
}
