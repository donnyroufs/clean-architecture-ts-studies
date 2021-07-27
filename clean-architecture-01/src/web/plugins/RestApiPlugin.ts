import {
  AddToContext,
  IAppConfig,
  Injectable,
  KondahPlugin,
} from '@kondah/core'
import {
  useContainer,
  JsonController,
  RoutingControllersOptions,
  useExpressServer,
  useKoaServer,
} from 'routing-controllers'

export const store: any[] = []

export class RestApiPlugin extends KondahPlugin<IAppConfig['rest-api']> {
  name = 'rest-api'
  private _app: any

  protected setup(): void | Promise<void> {
    useContainer(this.appContext.energizor)

    this._app = this.createServer({
      controllers: [...this.config.controllers],
      classToPlainTransformOptions: {
        excludeExtraneousValues: true,
      },
      classTransformer: true,
    })
  }

  @AddToContext()
  setupControllers() {
    store.forEach((c) => this.appContext.energizor.register(c))
  }

  private createServer(options: RoutingControllersOptions) {
    if (this.config.server === 'express') {
      return useExpressServer(this.appContext.server.getRawServer(), options)
    }

    return useKoaServer(this.appContext.server.getRawServer(), options)
  }
}

export const Controller = (endpoint: string, opts?: any) => {
  return (controller: any) => {
    store.push(controller)
    Injectable()(controller)
    return JsonController(endpoint, opts)(controller)
  }
}
