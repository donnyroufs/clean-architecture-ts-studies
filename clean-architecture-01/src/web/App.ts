import { AppContext, Energizor, Kondah, Logger } from '@kondah/core'

import { RestApiPlugin } from '@Web/plugins/RestApiPlugin'
import { AppDependencyInjection } from '@Application/AppDependencyInjection'
import { CreateUserUseCasePresenterToken } from '@Application/common/tokens/CreateUserUseCasePresenterToken'
import { UserController } from '@Web/controllers/UserController'
import { CreateUserUseCasePresenter } from '@Web/presenters/CreateUserUseCasePresenter'

// This is your only dependency ever on Infra from Web
import { InfraDependencyInjection } from '@Infra/InfraDependencyInjection'
import { GetUserUseCasePresenterToken } from '@Application/common/tokens/GetUserUseCasePresenterToken'
import { GetUserUseCasePresenter } from './presenters/GetUserUseCasePresenter'

export class App extends Kondah {
  constructor() {
    super({
      logger: new Logger('border'),
      libraries: [AppDependencyInjection, InfraDependencyInjection],
      plugins: [RestApiPlugin],
      config: {
        'rest-api': {
          controllers: [UserController],
          server: 'express',
        },
      },
    })
  }

  protected configureServices(services: Energizor): void | Promise<void> {
    services.setDefaultScope('singleton')

    services.register(CreateUserUseCasePresenterToken, {
      asClass: CreateUserUseCasePresenter,
    })

    services.register(GetUserUseCasePresenterToken, {
      asClass: GetUserUseCasePresenter,
    })
  }

  protected setup(context: AppContext): void | Promise<void> {
    context.setupControllers()

    context.server.run(5000)

    // Prisma Hangs with ts-node-dev so we fix it ;)
    process.on('SIGTERM', () => process.exit())
  }
}

new App()
