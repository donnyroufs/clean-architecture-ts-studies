import { IUserDto } from '@application/user/dtos/user.dto';
import { IPostDto } from './post.dto';

export interface IPostWithUserDto extends Omit<IPostDto, 'authorId'> {
  author: IUserDto;
}
