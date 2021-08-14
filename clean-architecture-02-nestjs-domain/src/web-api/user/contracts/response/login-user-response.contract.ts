import { IUserDto } from '@application/user/dtos/user.dto';
import { Role } from '@domain/user/roles.enum';
import { UserLocationProps } from '@domain/user/user-location';
import { BaseContract } from '@webApi/common/base-contract';
import { Contract } from '@webApi/common/decorators/contract.decorator';
import { Expose } from 'class-transformer';

@Contract()
export class LoginUserResponseContract
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

  @Expose()
  token: string;
}
