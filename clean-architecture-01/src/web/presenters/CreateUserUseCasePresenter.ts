import { Injectable } from '@kondah/core'

import { IPresenter } from '@Application/common/IPresenter'
import { CreateUserOutputPort } from '@Application/ports/output/CreateUserOutputPort'
import { CreateUserResponseContract } from '@Web/contracts/response/CreateUserResponseContract'
import { HttpResponse } from '@Web/common/HttpResponse'

@Injectable()
export class CreateUserUseCasePresenter
  implements IPresenter<CreateUserOutputPort>
{
  present(result: CreateUserOutputPort): HttpResponse {
    // TODO: we could use AutoMapper here
    const createUserResponseContract = CreateUserResponseContract.from(result)

    return new HttpResponse(createUserResponseContract.toJSON(), 201)
  }
}
