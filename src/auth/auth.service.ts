import { Injectable, Body, Controller, Get, Post, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import { generateHash, compare } from '../util/password';

interface LoginResponse {
  token: string;
}

interface TokenResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      return null;
    }

    const match = await compare(password, user.passwordHash);

    if (match) {
      const { passwordHash, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async login(user: any): Promise<TokenResponse> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
