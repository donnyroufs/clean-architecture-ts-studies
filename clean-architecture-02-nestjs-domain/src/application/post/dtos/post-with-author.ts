import { IUserDto } from '@application/user/dtos/user.dto';
import { IPostDto } from './post.dto';

export interface IPostWithAuthorDto extends Omit<IPostDto, 'authorId'> {
  author: IUserDto;
}
