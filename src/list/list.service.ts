import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddToListDto } from './dto/add-to-list.dto';
import { ContentType } from 'src/constants/constants';
import { Movie, MovieDocument } from 'src/models/movie.schema';
import { Model } from 'mongoose';
import { TVShow, TVShowDocument } from 'src/models/tvshow.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/models/user.schema';
import { GetListDto } from './dto/get-list.dto';

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

  private async fetchContentList(contentIds: string[], type: ContentType) {
    if (!contentIds.length) {
      return [];
    }
    const contentModel =
      type === ContentType.Movie ? this.movieModel : this.tvShowModel;
    const content = await (
      contentModel as Model<MovieDocument | TVShowDocument>
    )
      .find({ _id: { $in: contentIds } })
      .exec();
    if (!content) {
      [];
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

  async removeFromList(userId: string, contentId: string) {
    const user = await this.fetchUser(userId);
    const contentIndex = user.myList.findIndex(
      (item) => item.contentId === contentId,
    );
    if (contentIndex === -1) {
      throw new HttpException('Content not found', HttpStatus.BAD_REQUEST);
    }
    user.myList.splice(contentIndex, 1);
    await user.save();
    return {
      message: 'Content removed from list',
      contentId,
    };
  }

  async getListForUser(userId: string, limit: number, offset: number) {
    const user = await this.fetchUser(userId);
    return user.myList.slice(offset, offset + limit);
  }
  async listMyItems(userId: string, listDto: GetListDto) {
    const list = await this.getListForUser(
      userId,
      Number(listDto.limit || 20),
      Number(listDto.offset || 0),
    );

    const contentIdsByType = list.reduce(
      (acc, item) => {
        acc[item.contentType].push(item.contentId);
        return acc;
      },
      { [ContentType.Movie]: [], [ContentType.TVShow]: [] } as Record<
        ContentType,
        string[]
      >,
    );

    const [movies, tvShows] = await Promise.all([
      this.fetchContentList(
        contentIdsByType[ContentType.Movie],
        ContentType.Movie,
      ),
      this.fetchContentList(
        contentIdsByType[ContentType.TVShow],
        ContentType.TVShow,
      ),
    ]);

    return [...movies, ...tvShows];
  }

  async listUser() {
    throw new Error('Method not implemented.');
  }
}
