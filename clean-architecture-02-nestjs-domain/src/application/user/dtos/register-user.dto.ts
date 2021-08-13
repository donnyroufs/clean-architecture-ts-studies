import { UserLocationProps } from '@domain/user/user-location';

export interface IRegisterUserDto {
  email: string;
  password: string;
  location: UserLocationProps;
}
