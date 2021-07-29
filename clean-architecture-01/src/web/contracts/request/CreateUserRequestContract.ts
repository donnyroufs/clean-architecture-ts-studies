import { CreateUserInputPort } from '@Application/ports/input/CreateUserInputPort'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateUserRequestContract {
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly firstName: string

  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly lastName: string

  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly password: string

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  public readonly age: number

  static toInputPort(createUserRequestContract: CreateUserRequestContract) {
    return new CreateUserInputPort(
      createUserRequestContract.firstName,
      createUserRequestContract.lastName,
      createUserRequestContract.age,
      createUserRequestContract.password
    )
  }
}
