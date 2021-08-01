import { ValueObject } from '@domain/common/value-object';
import { ValidationException } from '@domain/exceptions/validation.exception';

type UserEmailProps = {
  value: string;
};

export class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  private static isValidEmail(email: string) {
    const expression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return expression.test(email);
  }

  public static create(email: string): UserEmail {
    if (!this.isValidEmail(email)) {
      throw new ValidationException('email');
    }

    return new UserEmail({
      value: email,
    });
  }
}
