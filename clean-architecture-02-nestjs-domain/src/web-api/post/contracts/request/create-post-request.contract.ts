import { ICreatePostDto } from '@application/post/dtos/create-post.dto';
import { Visibility } from '@domain/post/visibility.enum';
import { BaseContract } from '@webApi/common/base-contract';
import { Contract } from '@webApi/common/decorators/contract.decorator';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Contract()
export class CreatePostRequestContract
  extends BaseContract<ICreatePostDto>
  implements ICreatePostDto
{
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
