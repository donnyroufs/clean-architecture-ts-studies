import express from 'express'

import { IUserRepositoryToken } from '@/application/interfaces/IUserRepository'
import { CreateUserUseCase } from '@/application/useCases/CreateUserUseCase'
import { LocalDatabase } from '@/infra/drivers/local/LocalDatabase'
import { UserRepository } from '@/infra/drivers/local/repositories/UserRepository'
import { AppContext, Energizor, Kondah } from '@kondah/core'
import { UserController } from './controllers/UserController'

export class App extends Kondah {
  protected configureServices(services: Energizor): void | Promise<void> {
    services.register(LocalDatabase)
    services.register(CreateUserUseCase)
    services.register(IUserRepositoryToken, {
      asClass: UserRepository,
    })
    services.register(UserController)
  }

  protected setup(context: AppContext): void | Promise<void> {
    const controller = context.energizor.get(UserController)

    context.server.addGlobalMiddleware(express.json())
    context.server.router.post('/', (req, res) => controller.store(req, res))

    context.server.run(5000)
  }
}
