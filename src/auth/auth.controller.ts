import { Body, Controller, Post, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Authorize, Public } from './decorators/auth.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';

@Authorize()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('signin')
    signIn(@Body() _data: SignInDto, @Request() req) {
        return this.authService.signIn(req.user);
    }

    @ApiBearerAuth()
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}
