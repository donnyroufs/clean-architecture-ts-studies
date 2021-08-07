import { UserLocationProps } from '@domain/user/user-location';

export class RegisterUserRequestModel {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly location: UserLocationProps,
  ) {}
}
