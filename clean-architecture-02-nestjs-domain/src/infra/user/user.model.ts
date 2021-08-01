import { Role } from '@domain/user/roles.enum';
import { BaseModel } from '@infra/common/base-model';

export class UserModel extends BaseModel<string> {
  email: string;
  password: string;

  role: Role;

  // Q: Since this is coming from the UserLocation value-object, could we somehow treat this as it's
  // own database table with a composite key?
  country: string;
  city: string;
}
