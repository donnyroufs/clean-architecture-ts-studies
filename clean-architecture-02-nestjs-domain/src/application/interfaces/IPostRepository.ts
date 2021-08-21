import { IRepository } from '@application/common/IRepository';
import { Post } from '@domain/post/post.entity';

export interface IPostRepository extends IRepository<Post> {
  exists(title: string, authorId: Post['id']): Promise<boolean>;
}
