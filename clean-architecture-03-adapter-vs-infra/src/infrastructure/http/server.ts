import express, { Request, Response } from "express"
import { ControllerAction } from "src/adapters/ControllerAction"
import { PostController } from "src/adapters/PostController"
import { RequestImpl } from "./RequestImpl"
import { ResponseImpl } from "./ResponseImpl"

export class Server {
  private _app = express()

  public constructor(private readonly _postController: PostController) {}

  private async setupRoutes() {
    this._app.post(
      "/posts",
      this.adaptController(
        this._postController.createOne.bind(this._postController)
      )
    )
  }

  public async run(port: number) {
    this._app.use(express.json())

    await this.setupRoutes()

    this._app.listen(port, () =>
      console.log(`server is running on http://localhost:${port}`)
    )
  }

  private adaptController(action: ControllerAction<any>) {
    return (req: Request, res: Response) =>
      action(new RequestImpl(req), new ResponseImpl(res))
  }
}
