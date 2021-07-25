import { Result, err, ok } from '../../domain/common/Result'
import { IUseCase } from '../../domain/common/interfaces/IUseCase'
import { IVendingMachineRepository } from '../interfaces/IVendingMachineEntity'
import { IUserRepository } from '../interfaces/IUserRepository'

export class BuyColaUseCase implements IUseCase<boolean, string> {
  constructor(
    private readonly _vendingMachineRepo: IVendingMachineRepository,
    private readonly _userRepository: IUserRepository
  ) {}

  // TODO: Receive a BuyCola model
  execute(userId: string): Result<boolean, string> {
    const price = this._vendingMachineRepo.getColaPrice()
    const money = this._userRepository.getUserMoney(userId)

    // We could also use domain/application exceptions here.
    if (!money) {
      return err('We could not find a user')
    }

    if (money < price) {
      return err('You do not have enough money to buy a Cola.')
    }

    // TODO: Return a cola response model
    return ok(true)
  }
}
