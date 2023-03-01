import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreateUserDto {
  first_name: string;
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
