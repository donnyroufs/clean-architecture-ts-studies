import argon from 'argon2';
import { Injectable } from '@nestjs/common';

import { IHashService } from '@application/interfaces/IHashService';

@Injectable()
export class HashService implements IHashService {
  async hashPassword(password: string): Promise<string> {
    const hashed = await argon.hash(password);

    return hashed.toString();
  }

  verify(hashedPassword: string, password: string): Promise<boolean> {
    return argon.verify(hashedPassword, password);
  }
}
