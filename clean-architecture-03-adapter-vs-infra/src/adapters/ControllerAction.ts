import { IRequest } from "./IRequest"
import { IResponse } from "./IResponse"

export type ControllerAction<T extends object> = (
  req: IRequest<T>,
  res: IResponse
) => void
