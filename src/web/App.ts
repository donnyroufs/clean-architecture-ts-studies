import { LocalDatabase } from '../infra/drivers/local/LocalDatabase'
import { UserModel } from '../infra/drivers/local/models/UserModel'
import { UserRepository } from '../infra/drivers/local/repositories/UserRepository'
import { VendingMachineRepository } from '../infra/drivers/local/repositories/VendingMachineRepository'
import { BuyColaUseCase } from '../application/useCases/BuyColaUseCase'
import { VendingController } from './controllers/VendingController'

export class App {
  static run(fakeUser: UserModel) {
    const database = new LocalDatabase([fakeUser])
    const vendingRepo = new VendingMachineRepository(database)
    const userRepo = new UserRepository(database)
    const useCase = new BuyColaUseCase(vendingRepo, userRepo)
    const controller = new VendingController(useCase)

    const response = controller.buyCola(fakeUser.id)

    console.log({ controllerResponse: response })
  }
}
