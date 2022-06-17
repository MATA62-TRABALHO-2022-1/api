import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';

@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post("login")
    async login(@Res() res, @Body() dto: LoginInput) {
        const user = await this.authService.validateUser(dto.email, dto.password);

        const token = await this.authService.createToken(user.id, user.email, user.name);

        return res.status(HttpStatus.OK).json({
            message: 'Login has been successfully completed!',
            token,
        });
    }

}