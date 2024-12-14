import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddToListDto } from './dto/add-to-list.dto';
import { ContentType } from 'src/constants/constants';
import { Movie, MovieDocument } from 'src/models/movie.schema';
import { Model } from 'mongoose';
import { TVShow, TVShowDocument } from 'src/models/tvshow.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/models/user.schema';

@Injectable()
export class UserListService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    @InjectModel(TVShow.name)
    private readonly tvShowModel: Model<TVShowDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  private async fetchContent(contentId: string, type: ContentType) {
    const contentModel =
      type === ContentType.Movie ? this.movieModel : this.tvShowModel;
    const content = await (
      contentModel as Model<MovieDocument | TVShowDocument>
    )
      .findById(contentId)
      .exec();
    if (!content) {
      throw new HttpException('Content not found', HttpStatus.BAD_REQUEST);
    }
    return content;
  }

  private async fetchContentType(contentId: string) {
    const [movie, tvShow] = await Promise.all([
      this.fetchContent(contentId, ContentType.Movie).catch(() => null),
      this.fetchContent(contentId, ContentType.TVShow).catch(() => null),
    ]);
    if (movie) {
      return ContentType.Movie;
    }
    if (tvShow) {
      return ContentType.TVShow;
    }
    throw new HttpException('Content not found', HttpStatus.BAD_REQUEST);
  }
  private async fetchUser(userId: string) {
    const user = await this.userModel.findById(userId);
    console.log(`USER ${user?.username} with ${userId} fetched`);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  private async checkUserList(user: UserDocument, contentId: string) {
    const userList = new Set(user.myList.map((e) => e.contentId));
    if (userList.has(contentId)) {
      throw new HttpException(
        'Content already in list',
        HttpStatus.BAD_REQUEST,
      );
    }
    return userList;
  }

  async addToList(appendList: AddToListDto, userId: string) {
    const { contentId, contentType: inputContentType } = appendList;

    const contentType = await this.validateContentType(
      contentId,
      inputContentType as ContentType,
    );
    const user = await this.fetchUser(userId);
    await this.checkUserList(user, contentId);

    user.myList.push({ contentId, contentType });
    await user.save();

    return {
      message: 'Content added to list',
      contentId,
      contentType,
    };
  }

  private async validateContentType(
    contentId: string,
    contentType?: ContentType,
  ) {
    if (contentType && !Object.values(ContentType).includes(contentType)) {
      throw new Error('Invalid content type');
    }
    return contentType || (await this.fetchContentType(contentId));
  }

  async removeFromList() {
    throw new Error('Method not implemented.');
  }

  async listMyItems() {
    throw new Error('Method not implemented.');
  }

  async listUser() {
    throw new Error('Method not implemented.');
  }
}
