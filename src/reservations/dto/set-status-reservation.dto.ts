import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ReservationStatus } from 'src/common/constants/enum-of-reservation';

export class SetStatusReservationDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    id: number;

    @IsEnum(ReservationStatus)
    @ApiProperty({ enum: ReservationStatus })
    status: ReservationStatus;
}
