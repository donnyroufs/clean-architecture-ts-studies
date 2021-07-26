import express from 'express'

import { IUserRepositoryToken } from '@/application/interfaces/IUserRepository'
import { CreateUserUseCase } from '@/application/useCases/CreateUserUseCase'
import { LocalDatabase } from '@/infra/drivers/local/LocalDatabase'
import { LocalUserRepository } from '@/infra/drivers/local/repositories/LocalUserRepository'
import { AppContext, Energizor, Kondah } from '@kondah/core'
import { UserController } from './controllers/UserController'
import { PrismaUserRepository } from '@/infra/drivers/prisma/repositories/PrismaUserRepository'
import { PrismaDatabase } from '@/infra/drivers/prisma/PrismaDatabase'

export class App extends Kondah {
  protected configureServices(services: Energizor): void | Promise<void> {
    // Application
    services.register(CreateUserUseCase)

    // Infra
    services.register(LocalDatabase) // LocalDatabase | PrismaDatabase
    services.register(IUserRepositoryToken, {
      asClass: LocalUserRepository, // LocalUserRepository | PrismaUserRepository
    })

    // Web
    services.register(UserController)
  }

  protected setup(context: AppContext): void | Promise<void> {
    const controller = context.energizor.get(UserController)

    context.server.addGlobalMiddleware(express.json())
    context.server.router.post('/', (req, res) => controller.store(req, res))

    context.server.run(5000)

    // Prisma Hangs with ts-node-dev so we fix it ;)
    process.on('SIGTERM', () => process.exit())
  }
}
