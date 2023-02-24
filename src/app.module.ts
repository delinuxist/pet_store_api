import { Module } from '@nestjs/common';
import { PetModule } from './pets/pets.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, PetModule],
})
export class AppModule {}
