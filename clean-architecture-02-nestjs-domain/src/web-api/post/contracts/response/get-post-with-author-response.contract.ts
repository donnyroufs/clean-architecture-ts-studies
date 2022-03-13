import { IPostWithAuthorDto } from '@application/post/dtos/post-with-author';
import { IUserDto } from '@application/user/dtos/user.dto';
import { Visibility } from '@domain/post/visibility.enum';
import { BaseContract } from '@webApi/common/base-contract';
import { Contract } from '@webApi/common/decorators/contract.decorator';
import { Expose } from 'class-transformer';

@Contract()
export class GetPostWithAuthorResponseContract
  extends BaseContract<IPostWithAuthorDto>
  implements IPostWithAuthorDto
{
  @Expose()
  author: IUserDto;
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  content: string;
  @Expose()
  slug: string;
  @Expose()
  visibility: Visibility;
}
