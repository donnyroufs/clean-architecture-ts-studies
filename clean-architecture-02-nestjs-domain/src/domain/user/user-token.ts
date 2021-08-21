import { Guard } from '@domain/common/guard';
import { ValueObject } from '@domain/common/value-object';
import { ValidationException } from '@domain/exceptions/validation.exception';

export type UserTokenProps = {
  value: string;
};

export class UserToken extends ValueObject<UserTokenProps> {
  get value() {
    return this.props.value;
  }

  private constructor(props: UserTokenProps) {
    super(props);
  }

  static create(props: UserTokenProps) {
    return new UserToken(props);
  }
}
