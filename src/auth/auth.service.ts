import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { ErrorMessage } from 'src/common/constants/error-message';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new UnauthorizedException(ErrorMessage.EMAIL_NOT_REGISTERED);
        }

        const authorized = await bcrypt.compare(password, user.password);
        if (!authorized) {
            throw new UnauthorizedException(ErrorMessage.INVALID_PASSWORD);
        }

        return { ...user, password: undefined };
    }

    async signIn(user: User) {
        const { id, email } = user;
        return { accessToken: this.jwtService.sign({ id, email }), user };
    }
}
