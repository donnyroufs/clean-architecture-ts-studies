import { IPostDTO } from "./PostDTO"

export interface IPostPresenter<T = unknown> {
  okResult(post: IPostDTO): T
}
