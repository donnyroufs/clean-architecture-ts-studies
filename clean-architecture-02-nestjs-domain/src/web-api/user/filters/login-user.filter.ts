import { NotAuthenticatedException } from '@application/exceptions/not-authenticated.exception';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class LoginUserFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof NotAuthenticatedException) {
      return super.catch(new UnauthorizedException(exception.message), host);
    }

    return super.catch(exception, host);
  }
}
