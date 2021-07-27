declare module '@kondah/core' {
  interface AppContext {
    setupControllers(): void
  }

  interface IAppConfig {
    'rest-api': {
      controllers: any
      server: 'koa' | 'express'
    }
  }
}

export {}
