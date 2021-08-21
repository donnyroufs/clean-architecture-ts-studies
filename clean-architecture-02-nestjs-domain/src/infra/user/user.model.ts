import { Role } from '@domain/user/roles.enum';
import { BaseModel } from '@infra/common/base-model';
import { User as PrismaUser } from '@prisma/client';

export class UserModel extends BaseModel<string> implements PrismaUser {
  email: string;
  password: string;

  role: Role;

  country: string;
  city: string;
}
