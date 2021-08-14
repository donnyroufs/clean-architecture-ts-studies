import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { UserLocationProps } from '@domain/user/user-location';

@Exclude()
export class UserLocation implements UserLocationProps {
  @IsString()
  @Expose()
  city: string;

  @IsString()
  @Expose()
  country: string;
}
