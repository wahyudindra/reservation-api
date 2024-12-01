import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { UsersService } from './users.service';
import { Authorize } from 'src/auth/decorators/auth.decorator';

@Authorize()
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(@Query() query: QueryUsersDto) {
        return this.usersService.findUsers(query);
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number) {
        return this.usersService.findUser(id);
    }

    @Post()
    create(@Body() data: CreateUserDto) {
        return this.usersService.createUser(data);
    }

    @Patch(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Body() data: UpdateUserDto) {
        return this.usersService.updateUser(id, data);
    }

    @Delete(':id')
    remove(@Param('id', new ParseIntPipe()) id: number) {
        return this.usersService.remove(id);
    }
}
