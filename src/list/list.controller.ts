import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Delete
} from '@nestjs/common';
import { UserListService } from './list.service';
import { AddToListDto } from './dto/add-to-list.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetListDto } from './dto/get-list.dto';

@ApiTags('UserLists')
@Controller('list')
export class UserListController {
  constructor(private readonly userListService: UserListService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    console.log(req.user);
    const query = req.query as GetListDto;
    return this.userListService.listMyItems(req.user.userId, query);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() appendList: AddToListDto) {
    return this.userListService.addToList(appendList, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Request() req) {
    return this.userListService.removeFromList(req.user.userId, req.query.contentId);
  }
}
