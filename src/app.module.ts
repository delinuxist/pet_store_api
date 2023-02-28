import { Module } from '@nestjs/common';
import { PetModule } from './pets/pets.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PetModule,
    AuthModule,
  ],
})
export class AppModule {}
