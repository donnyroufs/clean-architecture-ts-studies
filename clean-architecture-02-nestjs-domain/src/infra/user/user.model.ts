import { Role } from '@domain/user/roles.enum';
import { BaseModel } from '@infra/common/base-model';
import { User as PrismaUser } from '@prisma/client';

export class UserModel extends BaseModel<string> implements PrismaUser {
  email: string;
  password: string;

  role: Role;

  // NOTE: Should this be it's own table?
  // We definitely need to send an object of Location to
  // the user mapper
  country: string;
  city: string;
}
