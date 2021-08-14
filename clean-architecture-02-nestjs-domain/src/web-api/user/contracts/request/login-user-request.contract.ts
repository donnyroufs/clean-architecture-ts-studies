import { Contract } from '@webApi/common/decorators/contract.decorator';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

@Contract()
export class LoginUserRequestContract {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  password: string;
}
