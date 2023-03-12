import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';

export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({});
  }
}
