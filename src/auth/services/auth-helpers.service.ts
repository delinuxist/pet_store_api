import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class AuthHelperService {
  async hashPassword(password: string): Promise<string> {
    const hash = await argon.hash(password);
    return hash;
  }
}
