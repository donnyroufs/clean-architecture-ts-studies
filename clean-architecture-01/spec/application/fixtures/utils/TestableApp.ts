import {
  Energizor,
  Kondah,
  KondahLibrary,
  NewableKondahLibrary,
} from '@kondah/core'
import { NullifiedLogger } from './NullifiedLogger'

export class TestableApp extends Kondah {
  constructor(libs: NewableKondahLibrary[] = []) {
    super({
      libraries: libs,
      config: {} as any,
      disableServer: true,
      logger: new NullifiedLogger(),
    })
  }
  configureServices(services: Energizor) {
    services.setDefaultScope('singleton')
  }

  async setup() {
    return undefined
  }

  static create(libs?: NewableKondahLibrary[]) {
    const app = new TestableApp(libs)

    return {
      app,
      energizor: app.getContext().energizor,
    }
  }
}
