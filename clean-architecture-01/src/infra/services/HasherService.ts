import argon from 'argon2'
import { Injectable } from '@kondah/core'

import { IHasherService } from '@Application/common/interfaces/IHasherService'

// This could be moved to Application since this is most likely not going to change
// and if it does the entire application needs to do migrations to make sure it all
// works again.
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
