import { Inject } from '@nestjs/common';

import { User } from '@domain/user/user.entity';

import { IMapper } from '@application/common/IMapper';
import { IUseCase } from '@application/common/IUseCase';
import { EntityNotFoundException } from '@application/exceptions/entity-not-found.exception';
import { IPostRepository } from '@application/interfaces/IPostRepository';
import { IUserRepository } from '@application/interfaces/IUserRepository';
import { PostMapperToken } from '@application/tokens/post-mapper.token';
import { PostRepositoryToken } from '@application/tokens/post-repository.token';
import { UserMapperToken } from '@application/tokens/user-mapper.token';
import { UserRepositoryToken } from '@application/tokens/user-repository.token';
import { NotAuthorizedException } from '@application/exceptions/not-authorized.exception';
import { IUserDto } from '@application/user/dtos/user.dto';
import { IGetPostWithAuthorDto } from '../dtos/get-post-with-author.dto';
import { IPostWithAuthorDto } from '../dtos/post-with-author';
import { IPostMapper } from '@application/interfaces/IPostMapper';

export class GetPostWithAuthorUseCase
  implements IUseCase<IGetPostWithAuthorDto, IPostWithAuthorDto>
{
  constructor(
    @Inject(PostMapperToken)
    private readonly _postMapper: IPostMapper,
    @Inject(PostRepositoryToken) private readonly _postRepo: IPostRepository,
    @Inject(UserRepositoryToken) private readonly _userRepo: IUserRepository,
    @Inject(UserMapperToken)
    private readonly _userMapper: IMapper<User, IUserDto>,
  ) {}

  async execute(model: IGetPostWithAuthorDto): Promise<IPostWithAuthorDto> {
    const post = await this._postRepo.findOneBySlugAndAuthorId(
      model.slug,
      model.authorId,
    );

    if (!post) {
      throw new EntityNotFoundException('Post');
    }

    const user = await this._userRepo.findOne(post.authorId);

    if (!user) {
      throw new EntityNotFoundException('User');
    }

    const isAuthor = post.isAuthor(user.id);

    if (!isAuthor) {
      throw new NotAuthorizedException();
    }

    return this._postMapper.toPostWithAuthorDto(post, user);
  }
}
