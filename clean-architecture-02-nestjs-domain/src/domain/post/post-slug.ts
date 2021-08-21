import slugify from 'slugify';

import { ValueObject } from '@domain/common/value-object';

export type PostSlugProps = {
  value: string;
};

export class PostSlug extends ValueObject<PostSlugProps> {
  get value() {
    return this.props.value;
  }

  private constructor(props: PostSlugProps) {
    super(props);
  }

  static create(props: PostSlugProps) {
    const slug = slugify(props.value, {
      trim: true,
      lower: true,
    });

    return new PostSlug({ value: slug });
  }
}
