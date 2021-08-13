export class LoginUserRequestModel {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
