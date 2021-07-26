import 'dotenv/config'

import { App } from './web/App'

function bootstrap() {
  console.clear()

  new App({
    config: {},
  })
}

bootstrap()
