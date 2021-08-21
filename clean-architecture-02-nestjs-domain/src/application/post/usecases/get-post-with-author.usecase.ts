import { Inject } from '@nestjs/common';

import { Post } from '@domain/post/post.entity';
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
import { IPostWithUserDto } from '../dtos/post-with-author';
import { IPostDto } from '../dtos/post.dto';

export class GetPostWithAuthorUseCase
  implements IUseCase<IGetPostWithAuthorDto, IPostWithUserDto>
{
  constructor(
    @Inject(PostMapperToken)
    private readonly _postMapper: IMapper<Post, IPostDto>,
    @Inject(PostRepositoryToken) private readonly _postRepo: IPostRepository,
    @Inject(UserRepositoryToken) private readonly _userRepo: IUserRepository,
    @Inject(UserMapperToken)
    private readonly _userMapper: IMapper<User, IUserDto>,
  ) {}

  async execute(model: IGetPostWithAuthorDto): Promise<IPostWithUserDto> {
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

    const postDto = this._postMapper.toDto(post);
    const userDto = this._userMapper.toDto(user);

    return {
      ...postDto,
      author: userDto,
    };
  }
}
