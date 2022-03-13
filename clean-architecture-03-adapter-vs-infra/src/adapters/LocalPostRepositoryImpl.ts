import { Post } from "src/domain/Post"
import { IPostRepository } from "src/application/IPostRepository"
import { LocalDatabase } from "src/infrastructure/drivers/local-database"

export class LocalPostRepositoryImpl implements IPostRepository {
  public constructor(private readonly _db: LocalDatabase) {}

  public async save(post: Post): Promise<Post> {
    this.addPost(post)

    return post
  }

  private addPost(post: Post) {
    console.log(`Added post: ${post.title}`)

    // This should be abstracted to a mapper
    this._db.add("post", {
      id: post.id,
      title: post.title,
      body: post.body,
      createdAt: post.createdAt.toDateString(),
    })
  }
}
