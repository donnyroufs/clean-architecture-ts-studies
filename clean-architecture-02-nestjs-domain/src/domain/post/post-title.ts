import { ValueObject } from '@domain/common/value-object';
import { ValidationException } from '@domain/exceptions/validation.exception';

export type PostProps = {
  value: string;
};

export class PostTitle extends ValueObject<PostProps> {
  get value() {
    return this.props.value;
  }

  private constructor(props: PostProps) {
    super(props);
  }

  private static isValidTitle(title: string) {
    const expression = /^[a-zA-Z0-9 ]{4,32}$/;

    return expression.test(title);
  }

  static create(props: PostProps) {
    if (!this.isValidTitle(props.value)) {
      throw new ValidationException('title');
    }

    return new PostTitle(props);
  }
}
