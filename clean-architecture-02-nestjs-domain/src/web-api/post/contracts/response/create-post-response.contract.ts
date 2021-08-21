import { IPostDto } from '@application/post/dtos/post.dto';
import { Visibility } from '@domain/post/visibility.enum';
import { Contract } from '@webApi/common/decorators/contract.decorator';
import { Expose } from 'class-transformer';

@Contract()
export class CreatePostResponseContract implements IPostDto {
  @Expose()
  id: string;

  title: string;
  content: string;

  @Expose()
  slug: string;

  visibility: Visibility;
  authorId: string;
}
