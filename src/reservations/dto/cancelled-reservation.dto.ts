import { ApiProperty } from '@nestjs/swagger/dist';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CancelledReservationDto {
    @IsString()
    @IsOptional()
    @MaxLength(500)
    @ApiProperty({ default: 'notes from admin' })
    cancelledNotes?: string;
}
