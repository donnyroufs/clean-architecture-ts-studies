import { CreateUserInputPort } from '@Application/ports/input/CreateUserInputPort'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserRequestContract {
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly firstName: string

  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly lastName: string

  static toInputPort(createUserRequestContract: CreateUserRequestContract) {
    return new CreateUserInputPort(
      createUserRequestContract.firstName,
      createUserRequestContract.lastName
    )
  }
}
