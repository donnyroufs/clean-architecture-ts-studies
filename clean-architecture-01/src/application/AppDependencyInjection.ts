import { Energizor, KondahLibrary } from '@kondah/core'
import { CreateUserUseCase } from '@Application/useCases/CreateUserUseCase'

// Do we need this here? Should infrastructure maybe handle it all?
export class AppDependencyInjection extends KondahLibrary {
  configureServices(services: Energizor): void {
    services.register(CreateUserUseCase)
  }
}
