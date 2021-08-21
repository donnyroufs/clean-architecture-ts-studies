import { CreatePostUseCase } from '@application/post/usecases/create-post.usecase';
import { IUserDto } from '@application/user/dtos/user.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from '@webApi/common/guards/is-authenticated.guard';
import { CreatePostRequestContract } from './contracts/request/create-post-request.contract';
import { User } from '../common/decorators/user.decorator';

@Controller('/posts')
export class PostController {
  constructor(private readonly _createPostUseCase: CreatePostUseCase) {}

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
