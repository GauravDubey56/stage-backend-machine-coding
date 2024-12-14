import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserListController } from './list.controller';
import { UserListService } from './list.service';
import { User, UserSchema } from 'src/models/user.schema';
import { Movie, MovieSchema } from 'src/models/movie.schema';
import { TVShow, TVShowSchema } from 'src/models/tvshow.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    MongooseModule.forFeature([{ name: TVShow.name, schema: TVShowSchema }]),
  ],
  controllers: [UserListController],
  providers: [UserListService],
})
export class UserListModule {}
