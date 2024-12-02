import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist';
import {
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    MinDate,
} from 'class-validator';
import * as dayjs from 'dayjs';

export class CreateReservationDto {
    @Min(1)
    @Max(8)
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ default: 2 })
    seatCount: number;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ default: dayjs().format('YYYY-MM-DDT00:00:00') })
    @MinDate(() => dayjs().toDate())
    startedAt: Date;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    @ApiPropertyOptional({ default: 'notes from customer' })
    customerNotes?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty({ default: 'customer' })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty({ default: 'customer@rsv.id' })
    email: string;
}
