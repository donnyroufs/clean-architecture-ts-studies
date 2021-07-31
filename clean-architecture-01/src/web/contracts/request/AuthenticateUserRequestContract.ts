import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

import { AuthenticateUserInputPort } from '@Application/ports/input/AuthenticateUserInputPort'

export class AuthenticateUserRequestContract {
  @Expose()
  @IsString()
  @IsNotEmpty()
  firstName: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string

  static toInputPort(
    createUserRequestContract: AuthenticateUserRequestContract
  ) {
    return new AuthenticateUserInputPort(
      createUserRequestContract.firstName,
      createUserRequestContract.password
    )
  }
}
