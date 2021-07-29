import { UserEntity } from '@Domain/entities/UserEntity'

export class AuthenticateUserInputPort {
  constructor(
    public readonly firstName: string,
    public readonly password: string
  ) {}
}
