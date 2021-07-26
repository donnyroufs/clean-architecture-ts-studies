import { Energizor, KondahLibrary } from '@kondah/core'
import { CreateUserUseCase } from '@Application/useCases/CreateUserUseCase'

export class AppDependencyInjection extends KondahLibrary {
  configureServices(services: Energizor): void {
    services.register(CreateUserUseCase)
  }
}
