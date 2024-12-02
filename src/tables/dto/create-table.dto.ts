import { ApiProperty } from '@nestjs/swagger/dist';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateTableDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty({ default: 'Table 12 new' })
    name: string;

    @Min(1)
    @Max(8)
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ default: 2 })
    qty: number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isActive: boolean;
}
