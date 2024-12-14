import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { configDotenv } from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getEnv } from 'src/constants/constants';
configDotenv({ path: '../../.env' });
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    console.log(process.env.JWT_SECRET);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: getEnv().jwtSecret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email }; // Add more fields as needed
  }
}
