import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Session as GetSession,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Session } from 'express-session';
import { CreateUserDto } from '../../users/dtos';
import { UserEntity } from '../../users/entities';
import { LocalAuthGuard } from '../guards/LocalAuth.guard';
import { AuthService } from '../services';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() userData: CreateUserDto): Promise<UserEntity> {
    const user = await this.authService.register(userData);
    return new UserEntity(user);
  }

  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Req() req: Request): Promise<UserEntity> {
    return new UserEntity(req?.user);
  }

  @Get()
  async facebookSignIn() {
    return 'Facebook login';
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('logout')
  logout(@GetSession() session: Session) {
    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) reject(err);
        resolve(undefined);
      });
    });
  }
}
