import 'dotenv/config'

import { UserModel } from './infra/drivers/local/models/UserModel'
import { UserEntity } from './domain/entities/UserEntity'
import { App } from './web/App'

console.clear()

//#region for demostration purposes.
function createFakeUser(money: number) {
  const userEntity = new UserEntity()
  userEntity.money = money
  const userModel = new UserModel()
  userModel.id = userEntity.id
  userModel.money = userEntity.money

  return userModel
}
//#endregion hacky stuff

function bootstrap() {
  const userModel = createFakeUser(25)

  App.run(userModel)
}

bootstrap()
