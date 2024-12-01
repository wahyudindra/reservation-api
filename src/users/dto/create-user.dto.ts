import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty({ default: 'admin 1' })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty({ default: 'admin1@rsv.id' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty({ default: 'password' })
    password: string;
}
