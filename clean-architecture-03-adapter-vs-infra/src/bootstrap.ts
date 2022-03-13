import "dotenv/config"
import "reflect-metadata"
import { PostController } from "./adapters/PostController"
import { PostPresenterImpl } from "./adapters/PostPresenterImpl"
import { LocalPostRepositoryImpl } from "./adapters/LocalPostRepositoryImpl"
import { CreatePostUseCase } from "./application/CreatePostUseCase"
import { createAndConnectDatabase } from "./infrastructure/drivers/kysely"

import { Server } from "./infrastructure/http/server"
import { KyselyPostRepositoryImpl } from "./adapters/KyselyPostRepositoryImpl"

// Notice at how we can switch the database driver with ease
export async function bootstrap(local = false) {
  const db = await createAndConnectDatabase()

  const kyselyPostRepository = new KyselyPostRepositoryImpl(db)
  const localPostRepository = new LocalPostRepositoryImpl()

  const postRepository = local ? localPostRepository : kyselyPostRepository

  const postPresenter = new PostPresenterImpl()
  const createPostUseCase = new CreatePostUseCase(postRepository, postPresenter)
  const postController = new PostController(createPostUseCase)
  const server = new Server(postController)

  await server.run(5000)
}

bootstrap()
