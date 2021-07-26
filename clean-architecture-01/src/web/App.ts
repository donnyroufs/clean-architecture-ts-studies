import { AppContext, Energizor, Kondah, Logger } from '@kondah/core'
import express from 'express'

import { AppDependencyInjection } from '@Application/AppDependencyInjection'
import { InfraDependencyInjection } from '@Infra/InfraDependencyInjection'
import { UserController } from '@Web/controllers/UserController'

export class App extends Kondah {
  constructor() {
    super({
      logger: new Logger('border'),
      libraries: [AppDependencyInjection, InfraDependencyInjection],
      config: {},
    })
  }

  protected configureServices(services: Energizor): void | Promise<void> {
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

new App()
