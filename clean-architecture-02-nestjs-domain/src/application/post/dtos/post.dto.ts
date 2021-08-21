import { Post } from '@domain/post/post.entity';
import { Visibility } from '@domain/post/visibility.enum';

export interface IPostDto {
  id: Post['id'];
  title: string;
  content: string;
  slug: string;
  visibility: Visibility;
  authorId: string;
}
