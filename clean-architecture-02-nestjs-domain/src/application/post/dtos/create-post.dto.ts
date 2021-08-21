import { Visibility } from '@domain/post/visibility.enum';

export class ICreatePostDto {
  title: string;
  content: string;
  visibility: Visibility;
  authorId: string;
  slug: string;
}
