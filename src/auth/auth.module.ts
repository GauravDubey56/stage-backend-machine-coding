import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './auth.controller';
import { User, UserSchema } from 'src/models/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { getEnv } from 'src/constants/constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: async (_configService: ConfigService) => ({
        secret: getEnv().jwtSecret,
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UsersService, AuthService, JwtStrategy, ConfigService],
  controllers: [UsersController],
})
export class UsersModule {}
