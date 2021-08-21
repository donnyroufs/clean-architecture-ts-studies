import { IRepository } from '@application/common/IRepository';
import { NullOr } from '@domain/common/types';
import { Post } from '@domain/post/post.entity';

export interface IPostRepository extends IRepository<Post> {
  exists(title: string, authorId: Post['id']): Promise<boolean>;
  findOneBySlugAndAuthorId(
    slug: string,
    authorId: string,
  ): Promise<NullOr<Post>>;
}
