import { Module } from '@nestjs/common';
import { PetController } from './controllers';
import { PetService } from './services';

@Module({
  providers: [PetService],
  controllers: [PetController],
})
export class PetModule {}
