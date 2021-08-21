import { Injectable, Provider } from '@nestjs/common';

import { Post } from '@domain/post/post.entity';
import { IMapper } from '@application/common/IMapper';
import { IPostDto } from '@application/post/dtos/post.dto';
import { PostMapperToken } from '@application/tokens/post-mapper.token';

import { PostModel } from './post.model';
import { PostSlug } from '@domain/post/post-slug';
import { PostTitle } from '@domain/post/post-title';

@Injectable()
export class PostMapper implements IMapper<Post, IPostDto, PostModel> {
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
}

export const PostMapperProvider: Provider = {
  provide: PostMapperToken,
  useClass: PostMapper,
};
