import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../../users/dtos';
import { AuthHelperService } from './auth-helpers.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private authHelperService: AuthHelperService,
  ) {}

  async createUser(userData: CreateUserDto) {
    // hash password
    const hashedPassword = await this.authHelperService.hashPassword(
      userData.password,
    );

    const user = await this.prisma.user.create({
      data: {
        last_name: userData.first_name,
        first_name: userData.last_name,
        email: userData.email,
        address: {
          city: userData.address.city,
          town: userData.address.town,
        },
        hashed_password: hashedPassword,
      },
    });

    return user;
  }
}
