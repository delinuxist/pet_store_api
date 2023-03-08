import { Module } from '@nestjs/common';
import { PetModule } from './pets/pets.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { redisModule } from './common/config/modules.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({
      session: true,
    }),
    UsersModule,
    PetModule,
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}
