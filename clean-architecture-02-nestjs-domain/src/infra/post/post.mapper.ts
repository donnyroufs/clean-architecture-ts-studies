import { Inject, Injectable, Provider } from '@nestjs/common';

import { Post } from '@domain/post/post.entity';
import { IPostDto } from '@application/post/dtos/post.dto';
import { PostMapperToken } from '@application/tokens/post-mapper.token';

import { PostModel } from './post.model';
import { PostSlug } from '@domain/post/post-slug';
import { PostTitle } from '@domain/post/post-title';
import { IPostMapper } from '@application/interfaces/IPostMapper';
import { IPostWithAuthorDto } from '@application/post/dtos/post-with-author';
import { User } from '@domain/user/user.entity';
import { UserMapperToken } from '@application/tokens/user-mapper.token';
import { IUserMapper } from '@application/interfaces/IUserMapper';
import { UserModel } from '@infra/user/user.model';

@Injectable()
export class PostMapper implements IPostMapper<PostModel> {
  constructor(
    @Inject(UserMapperToken)
    private readonly _userMapper: IUserMapper<UserModel>,
  ) {}

  toPersistence(domain: Post): PostModel {
    return {
      id: domain.id,
      title: domain.title.value,
      slug: domain.slug,
      content: domain.content,
      authorId: domain.authorId,
      visibility: domain.visibility,
    };
  }

  toDomain(raw: any, id?: string): Post {
    return Post.create(
      {
        title: PostTitle.create({ value: raw.title }),
        slug: PostSlug.create({ value: raw.title }),
        authorId: raw.authorId,
        content: raw.content,
        visibility: raw.visibility,
      },
      id,
    );
  }

  toDto(domain: Post): IPostDto {
    return {
      id: domain.id,
      title: domain.title.value,
      slug: domain.slug,
      content: domain.content,
      authorId: domain.authorId,
      visibility: domain.visibility,
    };
  }

  toPostWithAuthorDto(post: Post, user: User): IPostWithAuthorDto {
    const { authorId, ...postDto } = this.toDto(post);
    const userDto = this._userMapper.toDto(user);

    return {
      ...postDto,
      author: userDto,
    };
  }
}

export const PostMapperProvider: Provider = {
  provide: PostMapperToken,
  useClass: PostMapper,
};
