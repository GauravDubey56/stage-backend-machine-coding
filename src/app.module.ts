import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { TvshowsModule } from './tvshows/tvshows.module';
import { UsersModule } from './auth/auth.module';
import { UserListModule } from './list/list.module';
import { UserSchema } from './models/user.schema';
import { TVShowSchema } from './models/tvshow.schema';
import { MovieSchema } from './models/movie.schema';
import { getEnv } from './constants/constants';
import { configDotenv } from 'dotenv';
configDotenv();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: async (_configService: ConfigService) => ({
        uri: getEnv().mongoUri,
      }),
    }),
    MoviesModule,
    TvshowsModule,
    UsersModule,
    UserListModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'TVShow', schema: TVShowSchema }]),
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  ],
})
export class AppModule {}
