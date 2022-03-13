import { Post } from "src/domain/Post"

export interface IPostRepository {
  save(post: Post): Promise<Post>
}
