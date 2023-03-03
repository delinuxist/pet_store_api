import { Prisma } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { CreateAddressDto } from '../dtos';

export class UserEntity {
  id: string;

  email: string;

  first_name: string;

  last_name: string;

  createdAt: Date;

  updatedAt: Date;

  address: CreateAddressDto | Prisma.JsonValue;

  @Exclude()
  hashed_password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
