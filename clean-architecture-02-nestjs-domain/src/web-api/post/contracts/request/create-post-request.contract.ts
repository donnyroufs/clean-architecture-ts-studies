import { ICreatePostDto } from '@application/post/dtos/create-post.dto';
import { Visibility } from '@domain/post/visibility.enum';
import { Contract } from '@webApi/common/decorators/contract.decorator';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Contract()
export class CreatePostRequestContract implements ICreatePostDto {
  @IsString()
  @Expose()
  title: string;

  @IsString()
  @Expose()
  content: string;

  @IsString()
  @Expose()
  visibility: Visibility;

  authorId: string;

  slug: string;
}
