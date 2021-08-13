import { BaseEntity } from '@domain/common/base-entity';
import { NullOr } from '@domain/common/types';
import { Role } from '@domain/user/roles.enum';
import { UserEmail } from '@domain/user/user-email';
import { UserLocation } from '@domain/user/user-location';

export type UserProps = {
  email: UserEmail;
  password: string;
  location: UserLocation;
  role?: Role;
  token?: NullOr<string>;
};

export class User extends BaseEntity<UserProps> {
  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get location() {
    return this.props.location;
  }

  get role() {
    return this.props.role;
  }

  get token(): NullOr<string> {
    return this.props.token;
  }

  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public isAdmin() {
    return this.role === Role.ADMIN;
  }

  public setHashedPassword(password: string) {
    this.props.password = password;
  }

  public setToken(token: string) {
    this.props.token = token;
  }

  static create(props: UserProps, id?: string) {
    props.role ??= Role.USER;
    props.token ??= null;

    return new User(props, id);
  }
}
