import { Energizor, KondahLibrary } from '@kondah/core'
import { CreateUserUseCase } from '@Application/useCases/CreateUserUseCase'
import { GetUserUseCase } from './useCases/GetUserUseCase'

export class AppDependencyInjection extends KondahLibrary {
  configureServices(services: Energizor): void {
    services.register(CreateUserUseCase)
    services.register(GetUserUseCase)
  }
}
