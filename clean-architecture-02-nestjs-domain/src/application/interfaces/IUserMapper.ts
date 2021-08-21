import { IMapper } from '@application/common/IMapper';
import { IUserDto } from '@application/user/dtos/user.dto';
import { User } from '@domain/user/user.entity';

export interface IUserMapper<T> extends IMapper<User, IUserDto, T> {}
