import { EntityAlreadyExistsException } from '@application/exceptions/entity-already-exists.exception';
import { FailedToPersistEntityException } from '@application/exceptions/failed-to-persist-entity.exception';
import { NotAuthenticatedException } from '@application/exceptions/not-authenticated.exception';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class CommonDomainExceptionsFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof FailedToPersistEntityException) {
      return super.catch(
        new UnprocessableEntityException(exception.message),
        host,
      );
    }

    if (exception instanceof EntityAlreadyExistsException) {
      return super.catch(new BadRequestException(exception.message), host);
    }

    if (exception instanceof NotAuthenticatedException) {
      return super.catch(new UnauthorizedException(exception.message), host);
    }

    return super.catch(exception, host);
  }
}
