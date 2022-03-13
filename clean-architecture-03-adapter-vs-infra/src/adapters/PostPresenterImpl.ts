import { IPostPresenter } from "src/application/IPostPresenter"
import { IPostDTO } from "src/application/PostDTO"
import { PostViewModel } from "./PostViewModel"

export class PostPresenterImpl implements IPostPresenter<PostViewModel> {
  public okResult(post: IPostDTO): PostViewModel {
    return PostViewModel.from(post)
  }
}
