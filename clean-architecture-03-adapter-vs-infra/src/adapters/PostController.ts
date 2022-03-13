import { CreatePostUseCase } from "src/application/CreatePostUseCase"
import { ICreatePostDTO } from "src/application/ICreatePostDTO"
import { IRequest } from "./IRequest"
import { IResponse } from "./IResponse"

type UserInput<T = object> = T

export class PostController {
  public constructor(private readonly _createPostUseCase: CreatePostUseCase) {}

  public async createOne(
    req: IRequest<UserInput<ICreatePostDTO>>,
    res: IResponse
  ) {
    const validated = this.isTypeOfCreateUserDTO(req.body)

    return res.asJSON(this._createPostUseCase.execute(validated))
  }

  // TODO: Should be abstracted
  private isTypeOfCreateUserDTO(data: UserInput<ICreatePostDTO>) {
    if (!(data.title && data.body)) throw new Error("invalid user input")

    return {
      title: data.title,
      body: data.title,
    } as ICreatePostDTO
  }
}
