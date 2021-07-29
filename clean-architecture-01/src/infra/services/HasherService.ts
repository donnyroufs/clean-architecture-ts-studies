import argon from 'argon2'
import { Injectable } from '@kondah/core'

import { IHasherService } from '@Application/common/interfaces/IHasherService'

@Injectable()
export class HasherService implements IHasherService {
  async hashPassword(password: string): Promise<string> {
    const hashed = await argon.hash(password)

    return hashed.toString()
  }

  async isValidPassword(
    hashedPassword: string,
    password: string
  ): Promise<boolean> {
    return argon.verify(hashedPassword, password)
  }
}
