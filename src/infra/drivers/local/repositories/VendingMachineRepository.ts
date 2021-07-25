import { IVendingMachineRepository } from '../../../../application/interfaces/IVendingMachineEntity'
import { LocalDatabase } from '../LocalDatabase'

export class VendingMachineRepository implements IVendingMachineRepository {
  constructor(private readonly _database: LocalDatabase) {}

  // TODO: Impl
  // Could also be more generic? Get vending price
  // Perhaps this should even be its own repository
  getColaPrice(): number {
    return 10
  }
}
