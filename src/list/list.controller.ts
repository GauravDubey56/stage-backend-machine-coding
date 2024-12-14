import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserListService } from './list.service';
import { AddToListDto } from './dto/add-to-list.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('UserLists')
@Controller('list')
export class UserListController {
  constructor(private readonly userListService: UserListService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    console.log(req.user);
    // return this.userListService.listMyItems();
    return [];
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() appendList: AddToListDto) {
    return this.userListService.addToList(appendList, req.user.userId);
  }
}
