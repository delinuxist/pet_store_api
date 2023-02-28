import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserEntity {
  @IsNotEmpty()
  @ApiProperty()
  first_name: string;
  last_name: string;
}
