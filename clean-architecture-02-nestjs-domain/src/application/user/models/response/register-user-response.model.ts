import { Role } from '@domain/user/roles.enum';

export class RegisterUserResponseModel {
  id: string;
  email: string;
  location: {
    city: string;
    country: string;
  };
  role: Role;
}
