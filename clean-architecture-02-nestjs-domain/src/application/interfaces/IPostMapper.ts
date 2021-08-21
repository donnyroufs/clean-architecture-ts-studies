import { IMapper } from '@application/common/IMapper';
import { IPostWithAuthorDto } from '@application/post/dtos/post-with-author';
import { IPostDto } from '@application/post/dtos/post.dto';
import { Post } from '@domain/post/post.entity';
import { User } from '@domain/user/user.entity';

export interface IPostMapper<T = unknown> extends IMapper<Post, IPostDto, T> {
  toPostWithAuthorDto(post: Post, user: User): IPostWithAuthorDto;
}
