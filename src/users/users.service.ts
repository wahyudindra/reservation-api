import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { BaseRepository } from 'src/utils/base-repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';

@Injectable()
export class UsersService extends BaseRepository {
    constructor(private prisma: PrismaService) {
        super(prisma, Prisma.ModelName.User);
    }

    findUsers(query: QueryUsersDto) {
        const select = this.constructSelect();
        return super.findAll({ ...query, select });
    }

    findUser(id: number) {
        const select = this.constructSelect();
        return super.findOne(id, { select });
    }

    async createUser({ password, ...data }: CreateUserDto) {
        const userData: Prisma.UserCreateInput = {
            ...data,
            password: await bcrypt.hash(password, 10),
        };

        return super.create(userData);
    }

    async updateUser(id: number, { password, ...data }: UpdateUserDto) {
        const userData: Prisma.UserCreateInput = {
            ...data,
            ...(password && { password: await bcrypt.hash(password, 10) }),
        };

        return super.update(id, userData);
    }

    constructSelect(): Prisma.UserSelect {
        return {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        };
    }
}
