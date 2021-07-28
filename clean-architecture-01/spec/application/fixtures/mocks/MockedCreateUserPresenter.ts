import { IPresenter } from '@Application/common/IPresenter'
import { Injectable } from '@kondah/core'

@Injectable()
export class MockedCreateUserPresenter implements IPresenter<unknown> {
  present(port: unknown) {
    return port
  }
}
