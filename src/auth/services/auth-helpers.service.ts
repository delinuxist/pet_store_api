import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class AuthHelperService {
  async hashPassword(password: string): Promise<string> {
    const hash = await argon.hash(password);
    return hash;
  }

  async comparePassword(
    password: string,
    hashed_password: string,
  ): Promise<boolean> {
    return await argon.verify(hashed_password, password);
  }
}
