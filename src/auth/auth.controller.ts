import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@ApiTags('Users')
@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true })) // Apply validation using ValidationPipe
  async create(@Body() createUserDro: CreateUserDto) {
    return this.usersService.create(createUserDro);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Validate user
    const user = await this.authService.validateUser(email, password);

    // Generate JWT token
    return this.authService.login(user);
  }
}
