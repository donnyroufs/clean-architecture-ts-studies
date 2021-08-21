import { Inject, Injectable, Provider } from '@nestjs/common';
import { v4 } from 'uuid';

import { Post } from '@domain/post/post.entity';
import { UpdateEntity } from '@application/common/update-entity';
import { IPostRepository } from '@application/interfaces/IPostRepository';
import { PostMapperToken } from '@application/tokens/post-mapper.token';
import { DBContext } from '@infra/prisma/db.context';
import { IMapper } from '@application/common/IMapper';
import { IPostDto } from '@application/post/dtos/post.dto';
import { PostModel } from './post.model';
import { PostRepositoryToken } from '@application/tokens/post-repository.token';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(
    private readonly _dbContext: DBContext,
    @Inject(PostMapperToken)
    private readonly _postMapper: IMapper<Post, IPostDto, PostModel>,
  ) {}

  async exists(title: string, authorId: Post['authorId']): Promise<boolean> {
    const alreadyExists = await this._dbContext.post.findFirst({
      where: {
        authorId,
        title,
      },
    });

    return !!alreadyExists;
  }

  find(): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }

  async findOneBySlugAndAuthorId(slug: string, authorId: Post['id']) {
    const foundPost = await this._dbContext.post.findFirst({
      where: {
        slug,
        authorId,
      },
    });

    if (!foundPost) {
      return null;
    }

    return this._postMapper.toDomain(foundPost);
  }

  async findOne(id: string): Promise<Post> {
    const foundPost = await this._dbContext.post.findFirst({
      where: {
        id,
      },
    });

    if (!foundPost) {
      return null;
    }

    return this._postMapper.toDomain(foundPost);
  }

  async save(entity: Post): Promise<boolean> {
    const model = this._postMapper.toPersistence(entity);

    const isCreated = await this._dbContext.post.create({ data: model });

    return !!isCreated;
  }

  updateOne(partialEntity: UpdateEntity<Post>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  deleteOne(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  generateId(): string {
    return v4();
  }
}

export const PostRepositoryProvider: Provider = {
  provide: PostRepositoryToken,
  useClass: PostRepository,
};
