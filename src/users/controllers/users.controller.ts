import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SignedInGuard } from '../../common/guard';
import { UserEntity } from '../entities';
import { UsersService } from '../services/users.service';

@UseGuards(SignedInGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiCreatedResponse({ type: UserEntity })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  getProfile(@Param('userId') userId: string): UserEntity {
    console.log(userId);
    return new UserEntity({
      id: 'sdfasdfdfadsf',
      email: 'del@gmail.com',
      first_name: 'Jake',
      last_name: 'hutons',
      address: {
        city: 'accra',
        town: '',
      },
      hashed_password: 'sdfadfasdf',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }
}
