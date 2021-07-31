import { Energizor, KondahLibrary } from '@kondah/core'
import { CreateUserUseCase } from '@Application/useCases/CreateUserUseCase'
import { GetUserUseCase } from '@Application/useCases/GetUserUseCase'
import { AuthService } from '@Application/services/AuthService'
import { AuthenticateUserUseCase } from './useCases/AuthenticateUserUseCase'
import { HasherService } from './services/HasherService'

export class AppDependencyInjection extends KondahLibrary {
  configureServices(services: Energizor): void {
    services.register(CreateUserUseCase)
    services.register(GetUserUseCase)
    services.register(AuthenticateUserUseCase)

    services.register(AuthService)
    services.register(HasherService)
  }
}
