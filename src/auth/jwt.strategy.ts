import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_TOKEN_SECRET_KEY,
    });
  }

	async validate(payload: any, done): Promise <boolean> {
		const timeDiff = payload.exp - payload.iat;
		if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

		const user = await this.userService.getUserById(payload.id);

		if(!user) {
			throw new UnauthorizedException();
	  }

		done(null, user);
		return true;
	}

}