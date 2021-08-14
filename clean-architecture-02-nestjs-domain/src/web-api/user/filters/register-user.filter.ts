import { EntityAlreadyExistsException } from '@application/exceptions/entity-already-exists.exception';
import { FailedToPersistEntityException } from '@application/exceptions/failed-to-persist-entity.exception';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class RegisterUserFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof FailedToPersistEntityException) {
      return super.catch(
        new UnprocessableEntityException(exception.message),
        host,
      );
    } else if (exception instanceof EntityAlreadyExistsException) {
      return super.catch(new BadRequestException(exception.message), host);
    }

    return super.catch(exception, host);
  }
}
