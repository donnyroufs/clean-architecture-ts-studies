import { IPostDTO } from "src/application/PostDTO"

export class PostViewModel {
  protected constructor(public title: string, public body: string) {}

  public static from(post: IPostDTO) {
    return new PostViewModel(post.title, post.body)
  }
}
