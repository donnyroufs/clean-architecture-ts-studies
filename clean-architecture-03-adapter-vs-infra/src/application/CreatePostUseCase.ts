import { ICreatePostDTO } from "./ICreatePostDTO"
import { IPostPresenter } from "./IPostPresenter"
import { IPostRepository } from "./IPostRepository"
import { PostMapper } from "./PostMapper"

export class CreatePostUseCase {
  public constructor(
    private readonly _postRepository: IPostRepository,
    private readonly _presenter: IPostPresenter
  ) {}

  public async execute(input: ICreatePostDTO): Promise<unknown> {
    const post = PostMapper.fromCreateDTO(input)

    const createdPost = await this._postRepository.save(post)

    return this._presenter.okResult(PostMapper.toDTO(createdPost))
  }
}
