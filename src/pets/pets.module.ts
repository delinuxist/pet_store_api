import { Module } from '@nestjs/common';
import { PetController } from './pets.controller';
import { PetService } from './pets.service';

@Module({
  providers: [PetService],
  controllers: [PetController]
})
export class PetModule {}