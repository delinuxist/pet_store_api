import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { AuthHelperService, AuthService } from './services';

@Module({
  providers: [AuthService, AuthHelperService],
  controllers: [AuthController],
})
export class AuthModule {}
