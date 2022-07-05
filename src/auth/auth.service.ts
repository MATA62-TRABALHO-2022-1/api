import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
    private readonly userService: UserService, 
    private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string){
        const user = await this.userService.getUserByEmailAndPassword(email, password);

        if(!user){
            throw new UnauthorizedException('Could not authenticate. Please try again.');
        }

        return user;
    }

    async createToken(id: number, email: string, name: string, role: string){
        const payload = { id, email, name, role };

        const accessToken = await this.jwtService.signAsync(payload);
        const expiresToken = AuthService.prettyPrintSeconds(process.env.JWT_TOKEN_EXPIRES_IN);

        return {            
            accessToken,
            expiresToken,
        };
    }

    private static prettyPrintSeconds(time: string): string {
        const ntime = Number(time);
        const hours = Math.floor(ntime / 3600);
        const minutes = Math.floor((ntime % 3600) / 60);
        const seconds = Math.floor((ntime % 3600) % 60);

        return `${hours > 0 ? hours + (hours === 1 ? ' hour,' : ' hours,') : ''} 
    ${minutes > 0 ? minutes + (minutes === 1 ? ' minute' : ' minutes') : ''}
    ${seconds > 0 ? seconds + (seconds === 1 ? ' second' : ' seconds') : ''}`;
    }
}