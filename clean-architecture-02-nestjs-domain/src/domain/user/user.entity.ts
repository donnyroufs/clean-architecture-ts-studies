import { BaseEntity } from '@domain/common/base-entity';
import { Role } from '@domain/user/roles.enum';
import { UserEmail } from '@domain/user/user-email';
import { UserLocation } from '@domain/user/user-location';

export type UserProps = {
  email: UserEmail;
  password: string;
  location: UserLocation;
  role?: Role;
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

  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public isAdmin() {
    return this.role === Role.ADMIN;
  }

  static create(props: UserProps, id?: string) {
    if (!props.role) {
      props.role = Role.USER;
    }

    const user = new User(props, id);

    return user;
  }
}
