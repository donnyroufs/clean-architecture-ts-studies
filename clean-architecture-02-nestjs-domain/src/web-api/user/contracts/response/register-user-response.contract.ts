import { Role } from '@domain/user/roles.enum';
import { IUserDto } from '@application/user/dtos/user.dto';
import { Contract } from '@webApi/common/decorators/contract.decorator';
import { Expose } from 'class-transformer';
import { UserLocationProps } from '@domain/user/user-location';
import { BaseContract } from '@webApi/common/base-contract';

@Contract()
export class RegisterUserResponseContract
  extends BaseContract<IUserDto>
  implements IUserDto
{
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  location: UserLocationProps;
  @Expose()
  role: Role;

  token: string;
}
