import { NullOr } from '@domain/common/types';
import { Role } from '@domain/user/roles.enum';

export interface IUserDto {
  id: string;
  email: string;
  location: {
    city: string;
    country: string;
  };
  role: Role;
  token: NullOr<string>;
}
