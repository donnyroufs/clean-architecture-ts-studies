import { Response } from "express"
import { IResponse } from "src/adapters/IResponse"

export class ResponseImpl implements IResponse {
  public constructor(private readonly _res: Response) {}

  asJSON(data: any): void {
    this._res.json(data)
  }
}
