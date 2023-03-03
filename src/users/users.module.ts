import { Module } from '@nestjs/common';
import { UsersController } from './controllers';
import { UsersHelperService, UsersService } from './services';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersHelperService],
})
export class UsersModule {}
