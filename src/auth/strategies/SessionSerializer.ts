import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { user } from '@prisma/client';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }
  serializeUser(user: user, done: (err: Error, user: user) => void) {
    done(null, user);
  }
  async deserializeUser(user: user, done: (err: Error, user: user) => void) {
    done(null, user);
  }
}
