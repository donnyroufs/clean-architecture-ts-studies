import { Role } from '@domain/user/roles.enum';

export class LoginUserResponseModel {
  id: string;
  email: string;
  location: {
    city: string;
    country: string;
  };
  role: Role;
  token: string;
}
