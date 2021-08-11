import { ExceptionMixin } from '@application/common/exception.mixin';

export class BadCredentialsException extends ExceptionMixin.create(
  'Credentials do not match',
) {}
