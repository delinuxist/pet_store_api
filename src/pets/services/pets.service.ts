import { Injectable } from '@nestjs/common';

@Injectable()
export class PetService {
  addPet() {
    return {
      id: 2,
      name: 'Scooby',
    };
  }
}
