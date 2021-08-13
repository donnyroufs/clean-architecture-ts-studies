import bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

import { IHashService } from '@application/interfaces/IHashService';

@Injectable()
export class HashService implements IHashService {
  static SALT = 10;

  async hashPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, HashService.SALT);

    return hashed;
  }

  async verify(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
