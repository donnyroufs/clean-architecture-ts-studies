import { Injectable, Provider } from '@nestjs/common';

import { UserLocation } from '@domain/user/user-location';
import { UserEmail } from '@domain/user/user-email';
import { User } from '@domain/user/user.entity';
import { IMapper } from '@application/common/IMapper';
import { IUserDto } from '@application/user/dtos/user.dto';
import { UserModel } from '@infra/user/user.model';
import { UserMapperToken } from '@application/tokens/user-mapper.token';

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

  toDomain(raw: any, id?: User['id']): User {
    return User.create(
      {
        email: UserEmail.create(raw.email),
        location: UserLocation.create({
          city: raw.location?.city || raw.city,
          country: raw.location?.country || raw.country,
        }),
        password: raw.password,
        role: raw.role,
      },
      raw.id || id,
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
      token: domain?.token,
    };
  }
}

export const UserMapperProvider: Provider = {
  provide: UserMapperToken,
  useClass: UserMapper,
};
