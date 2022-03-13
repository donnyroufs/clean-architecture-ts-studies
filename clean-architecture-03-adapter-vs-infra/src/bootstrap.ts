import "dotenv/config"
import "reflect-metadata"
import { PostController } from "./adapters/PostController"
import { PostPresenterImpl } from "./adapters/PostPresenterImpl"
import { PostRepositoryImpl } from "./adapters/LocalPostRepositoryImpl"
import { CreatePostUseCase } from "./application/CreatePostUseCase"
import { createAndConnectDatabase } from "./infrastructure/drivers/kysely"

import { Server } from "./infrastructure/http/server"
import { KyselyPostRepositoryImpl } from "./adapters/KyselyPostRepositoryImpl"

export async function bootstrap() {
  const db = await createAndConnectDatabase()

  const kyselyPostRepository = new KyselyPostRepositoryImpl(db)
  const postRepository = new PostRepositoryImpl()
  const postPresenter = new PostPresenterImpl()
  const createPostUseCase = new CreatePostUseCase(
    kyselyPostRepository,
    postPresenter
  )
  const postController = new PostController(createPostUseCase)
  const server = new Server(postController)

  await server.run(5000)
}

bootstrap()
