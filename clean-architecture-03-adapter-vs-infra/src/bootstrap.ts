import "dotenv/config"
import "reflect-metadata"

import { CreatePostUseCase } from "./application/CreatePostUseCase"

import { KyselyPostRepositoryImpl } from "./adapters/KyselyPostRepositoryImpl"
import { PostController } from "./adapters/PostController"
import { PostPresenterImpl } from "./adapters/PostPresenterImpl"
import { LocalPostRepositoryImpl } from "./adapters/LocalPostRepositoryImpl"

import { Server } from "./infrastructure/http/server"
import { createAndConnectDatabase } from "./infrastructure/drivers/kysely"
import { LocalDatabase } from "./infrastructure/drivers/local-database/index"

// Notice at how we can switch the database driver with ease
export async function bootstrap(local = true) {
  const localDriver = new LocalDatabase()
  const sqliteDriver = await createAndConnectDatabase()

  const kyselyPostRepository = new KyselyPostRepositoryImpl(sqliteDriver)
  const localPostRepository = new LocalPostRepositoryImpl(localDriver)

  const postRepository = local ? localPostRepository : kyselyPostRepository

  const postPresenter = new PostPresenterImpl()
  const createPostUseCase = new CreatePostUseCase(postRepository, postPresenter)
  const postController = new PostController(createPostUseCase)
  const server = new Server(postController)

  await server.run(5000)
}

bootstrap()
