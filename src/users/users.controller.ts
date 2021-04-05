import {
  Body,
  Request,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { Users } from './models/users.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { generateHash } from '../util/password';

interface CreateUserDto {
  email: string;
  name: string;
  image: string;
  password: string;
}

/*interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}*/

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<Array<Users>> {
    return await this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() userCreateRequest: CreateUserDto): Promise<void> {
    const user = await this.usersService.findUserByEmail(userCreateRequest.email);

    if (user) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    const passwordHash = await generateHash(userCreateRequest.password);

    const newUser: Users = {
      email: userCreateRequest.email,
      name: userCreateRequest.name,
      image: userCreateRequest.image,
      passwordHash,
    };

    await this.usersService.insert(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  /*
  @Post('login')
  async login(@Body() { email, password }: LoginRequest): Promise<LoginResponse> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    const match = await compare(password, user.passwordHash);

    if (match) {
      return { token: 'test_token' };
    } else {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }
  }*/
}
