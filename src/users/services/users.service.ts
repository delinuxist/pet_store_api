import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersHelperService } from './users-helper.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private usersHelper: UsersHelperService,
  ) {}

  async getUsers() {
    const users = await this.prisma.user.findMany({});
    const usersWithoutHash = this.usersHelper.excludeFields(users, [
      'hashed_password',
    ]);
    return usersWithoutHash;
  }
}
