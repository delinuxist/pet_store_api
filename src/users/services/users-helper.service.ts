import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersHelperService {
  excludeFields<Data, Keys extends keyof Data>(
    arrayData: Data[],
    keys: Keys[],
  ) {
    for (const user of arrayData) {
      for (const key of keys) {
        delete user[key];
      }
    }
    return arrayData;
  }
}
