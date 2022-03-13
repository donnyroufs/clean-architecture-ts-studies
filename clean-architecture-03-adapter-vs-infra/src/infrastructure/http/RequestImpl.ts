import { Request } from "express"
import { IRequest } from "src/adapters/IRequest"

export class RequestImpl<T extends object> implements IRequest<T> {
  public readonly body: T

  public constructor(req: Request) {
    this.body = req.body
  }
}
