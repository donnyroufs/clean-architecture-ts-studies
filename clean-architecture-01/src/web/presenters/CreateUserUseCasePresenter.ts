import { Injectable } from '@kondah/core'
import { HttpError } from 'routing-controllers'

import { CoreException } from '@Domain/common/CoreException'
import { IPresenter } from '@Application/common/IPresenter'
import { CreateUserOutputPort } from '@Application/ports/output/CreateUserOutputPort'
import { CreateUserResponseContract } from '@Web/contracts/response/CreateUserResponseContract'
import { HttpResponse } from '@Web/common/HttpResponse'

@Injectable()
export class CreateUserUseCasePresenter
  implements IPresenter<CreateUserOutputPort>
{
  present(port: CreateUserOutputPort | CoreException): HttpResponse<string> {
    if (port instanceof CoreException) {
      throw new HttpError(400, port.message)
    }

    return new HttpResponse(
      CreateUserResponseContract.fromPort(port).toJSON(),
      201
    )
  }
}

/*
	Alternative way of handling the errors with the Result pattern would look something like this:
	{
			if(port.isErr) {
				throw new HttpError(400, port.message)
			}

			return new HttpResponse(CreateUserResponseContract.fromPort(port.value).toJSON(),
				201
			)
	}
*/
