import { NullOr } from '@domain/common/types';
import { Role } from '@domain/user/roles.enum';
import { UserLocationProps } from '@domain/user/user-location';

export interface IUserDto {
  id: string;
  email: string;
  location: UserLocationProps;
  role: Role;
  token: NullOr<string>;
}
