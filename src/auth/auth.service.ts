import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
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

    async createToken(user: User){
        const payload = { ...user };
        const accessToken = await this.jwtService.signAsync(payload);

        return accessToken;
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