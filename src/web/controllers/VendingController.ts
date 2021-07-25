import { BuyColaUseCase } from '../../application/useCases/BuyColaUseCase'

export class VendingController {
  constructor(private readonly _BuyColaUseCase: BuyColaUseCase) {}

  buyCola(userId: string) {
    const result = this._BuyColaUseCase.execute(userId)

    if (result.isErr()) {
      throw new Error(result.error)
    }

    return result.value
  }
}
