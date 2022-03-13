import { IPostRepository } from "src/application/IPostRepository"
import { Post } from "src/domain/Post"

export class LocalPostRepositoryImpl implements IPostRepository {
  private readonly _posts: Post[] = []

  public async save(post: Post): Promise<Post> {
    this.addPost(post)

    return post
  }

  private addPost(post: Post) {
    console.log(`Added post: ${post.title}`)
    this._posts.push(post)
  }
}
