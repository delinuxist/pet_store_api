import { Controller, Post } from '@nestjs/common';
import { PetService } from '../services';

@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {}
  @Post('add-pet')
  addPet() {
    return this.petService.addPet();
  }
}
