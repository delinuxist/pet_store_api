import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { AuthService } from './services';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
