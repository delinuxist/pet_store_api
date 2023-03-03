import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dtos';
import { UserEntity } from '../../users/entities';
import { AuthService } from '../services';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async createUser(@Body() userData: CreateUserDto): Promise<UserEntity> {
    const user = await this.authService.createUser(userData);
    return new UserEntity(user);
  }
}
