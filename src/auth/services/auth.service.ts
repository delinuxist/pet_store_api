import {
  ClassSerializerInterceptor,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../../users/dtos';
import { UserEntity } from '../../users/entities';
import { SignInDto } from '../dtos';
import { AuthHelperService } from './auth-helpers.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private authHelperService: AuthHelperService,
  ) {}

  async register(userData: CreateUserDto) {
    try {
      // hash password
      const hashedPassword = await this.authHelperService.hashPassword(
        userData.password,
      );

      const user = await this.prisma.user.create({
        data: {
          last_name: userData.last_name,
          first_name: userData.first_name,
          email: userData.email,
          username: userData.username,
          address: {
            city: userData.address.city,
            town: userData.address.town,
          },
          hashed_password: hashedPassword,
        },
      });

      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002' && err.meta?.target[0] === 'username')
          throw new ForbiddenException('username taken');
      }
      if (err.code === 'P2002' && err.meta?.target[0] === 'email')
        throw new ForbiddenException('email taken');
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  async validateUser({ username, password }: SignInDto): Promise<UserEntity> {
    // find user with email
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) throw new UnauthorizedException();

    const isMatch = await this.authHelperService.comparePassword(
      password,
      user.hashed_password,
    );

    if (!isMatch) throw new UnauthorizedException();

    return isMatch ? user : null;
  }
}
