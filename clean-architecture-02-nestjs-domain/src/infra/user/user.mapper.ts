import { Injectable } from '@nestjs/common';

import { UserLocation } from '@domain/user/user-location';
import { UserEmail } from '@domain/user/user-email';
import { User } from '@domain/user/user.entity';
import { IMapper } from '@application/common/IMapper';
import { UserModel } from '@infra/user/user.model';
import { IUserDto } from '@application/user/dtos/user.dto';

@Injectable()
export class UserMapper implements IMapper<User, IUserDto, UserModel> {
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
          city: model.location?.city || model.city,
          country: model.location?.country || model.country,
        }),
        password: model.password,
        role: model.role,
      },
      model.id || id,
    );
  }

  toDto(domain: User): IUserDto {
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
