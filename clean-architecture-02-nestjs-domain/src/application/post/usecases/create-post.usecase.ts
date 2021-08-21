import { Inject, Injectable } from '@nestjs/common';

import { Post } from '@domain/post/post.entity';
import { IMapper } from '@application/common/IMapper';
import { IUseCase } from '@application/common/IUseCase';
import { IPostRepository } from '@application/interfaces/IPostRepository';
import { PostMapperToken } from '@application/tokens/post-mapper.token';
import { PostRepositoryToken } from '@application/tokens/post-repository.token';
import { EntityAlreadyExistsException } from '@application/exceptions/entity-already-exists.exception';
import { FailedToPersistEntityException } from '@application/exceptions/failed-to-persist-entity.exception';

import { ICreatePostDto } from '../dtos/create-post.dto';
import { IPostDto } from '../dtos/post.dto';

@Injectable()
export class CreatePostUseCase implements IUseCase<ICreatePostDto, IPostDto> {
  constructor(
    @Inject(PostRepositoryToken)
    private readonly _postRepo: IPostRepository,
    @Inject(PostMapperToken)
    private readonly _postMapper: IMapper<Post, IPostDto>,
  ) {}

  async execute(model: ICreatePostDto): Promise<IPostDto> {
    const generatedId = this._postRepo.generateId();
    const entity = this._postMapper.toDomain(model, generatedId);

    const exists = await this._postRepo.exists(
      entity.title.value,
      entity.authorId,
    );

    if (exists) {
      throw new EntityAlreadyExistsException('Post');
    }

    const createdPost = await this._postRepo.save(entity);

    if (!createdPost) {
      throw new FailedToPersistEntityException('Post');
    }

    const post = await this._postRepo.findOne(generatedId);

    return this._postMapper.toDto(post);
  }
}
