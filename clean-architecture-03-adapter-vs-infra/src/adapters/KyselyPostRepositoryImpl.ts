import { Kysely } from "kysely"
import { IPostRepository } from "src/application/IPostRepository"
import { Post } from "src/domain/Post"
import { Database } from "src/infrastructure/drivers/kysely"

export class KyselyPostRepositoryImpl implements IPostRepository {
  public constructor(private readonly _db: Kysely<Database>) {}

  // The repository should have its own mapper which maps the domain entity to it's own model.
  // When it's done it will map the database model back to the domain enitiy, for simplicity sake
  // I didn't bother.
  public async save(post: Post): Promise<Post> {
    await this._db
      .insertInto("post")
      .values({
        id: post.id,
        body: post.body,
        createdAt: post.createdAt.toDateString(),
        title: post.title,
      })
      .execute()

    await this.logCreatedPostsForExampleSake()

    return post
  }

  private async logCreatedPostsForExampleSake() {
    const result = await this._db.selectFrom("post").selectAll().execute()
    console.log(result)
  }
}
