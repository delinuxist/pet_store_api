import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { AuthHelperService, AuthService } from './services';
import { LocalStrategy } from './strategies';
import { SessionSerializer } from './strategies/SessionSerializer';

@Module({
  providers: [AuthService, AuthHelperService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
