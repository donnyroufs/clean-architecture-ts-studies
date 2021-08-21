import { CreatePostUseCase } from '@application/post/usecases/create-post.usecase';
import { IUserDto } from '@application/user/dtos/user.dto';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from '@webApi/common/guards/is-authenticated.guard';
import { CreatePostRequestContract } from './contracts/request/create-post-request.contract';
import { User } from '../common/decorators/user.decorator';
import { GetPostWithAuthorUseCase } from '@application/post/usecases/get-post-with-author.usecase';

@Controller('/posts')
export class PostController {
  constructor(
    private readonly _createPostUseCase: CreatePostUseCase,
    private readonly _getPostWithAuthorUseCase: GetPostWithAuthorUseCase,
  ) {}

  @Get('/:slug')
  @UseGuards(IsAuthenticatedGuard)
  async show(
    @Body() contract: any,
    @User() user: IUserDto,
    @Param('slug') slug: string,
  ) {
    contract.authorId = user.id;
    contract.slug = slug;

    const result = await this._getPostWithAuthorUseCase.execute(contract);

    return result;
  }

  @Post('/')
  @UseGuards(IsAuthenticatedGuard)
  async store(
    @Body() contract: CreatePostRequestContract,
    @User() user: IUserDto,
  ) {
    contract.authorId = user.id;

    const result = await this._createPostUseCase.execute(contract);

    return result;
  }
}
