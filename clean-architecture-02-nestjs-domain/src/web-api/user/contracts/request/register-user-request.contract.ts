import { IRegisterUserDto } from '@application/user/dtos/register-user.dto';
import { UserLocation } from '@domain/user/user-location';
import { Contract } from '@webApi/common/decorators/contract.decorator';
import { Expose, Type } from 'class-transformer';
import {
  IsObject,
  IsString,
  IsEmail,
  Length,
  ValidateNested,
} from 'class-validator';

@Contract()
export class RegisterUserRequestContract implements IRegisterUserDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @Length(6, 128)
  password: string;

  @Expose()
  @ValidateNested()
  @IsObject({
    message: 'Location should be of type UserLocation',
  })
  @Type(() => UserLocation)
  location: UserLocation;
}
