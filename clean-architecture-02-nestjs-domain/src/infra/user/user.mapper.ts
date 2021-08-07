import { Injectable } from '@nestjs/common';

import { UserLocation } from '@domain/user/user-location';
import { UserEmail } from '@domain/user/user-email';
import { User } from '@domain/user/user.entity';
import { IMapper } from '@application/common/IMapper';
import { RegisterUserResponseModel } from '@application/user/models/response/register-user-response.model';
import { UserModel } from '@infra/user/user.model';

@Injectable()
export class UserMapper
  implements IMapper<User, RegisterUserResponseModel, UserModel>
{
  toPersistence(domain: User): UserModel {
    return {
      id: domain.id,
      email: domain.email.value,
      city: domain.location.city,
      country: domain.location.country,
      password: domain.password,
      role: domain.role,
    };
  }

  toDomain(model: any, id?: User['id']): User {
    return User.create(
      {
        email: UserEmail.create(model.email),
        location: UserLocation.create({
          city: model.location.city,
          country: model.location.country,
        }),
        password: model.password,
        role: model.role,
      },
      model.id || id,
    );
  }

  toWorld(domain: User): RegisterUserResponseModel {
    if (!domain.id) {
      throw new Error('Missing Id for User Entity');
    }

    return {
      id: domain.id,
      email: domain.email.value,
      location: {
        city: domain.location.city,
        country: domain.location.country,
      },
      role: domain.role,
    };
  }
}
