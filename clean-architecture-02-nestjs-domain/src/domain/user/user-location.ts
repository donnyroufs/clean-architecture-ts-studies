import { Guard } from '@domain/common/guard';
import { ValueObject } from '@domain/common/value-object';
import { ValidationException } from '@domain/exceptions/validation.exception';

type UserLocationProps = {
  city: string;
  country: string;
};

export class UserLocation extends ValueObject<UserLocationProps> {
  get country(): string {
    return this.props.country;
  }

  get city(): string {
    return this.props.city;
  }

  private constructor(props: UserLocationProps) {
    super(props);
  }

  static create(props: UserLocationProps) {
    if (!Guard.againstNullOrDefined(props)) {
      throw new ValidationException();
    }

    return new UserLocation(props);
  }
}
