import { BaseEntity } from '@domain/common/base-entity';
import { Visibility } from '@domain/post/visibility.enum';

type PostEntityProps = {
  title: string;
  content: string;
  visibility: Visibility;
  authorId: string;
};

export class PostEntity extends BaseEntity<PostEntityProps> {
  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get visibility() {
    return this.visibility;
  }

  public canVisit(userId: string) {
    if (this.props.authorId !== userId) {
      return false;
    }

    if (this.visibility === Visibility.PRIVATE) {
      return false;
    }

    return true;
  }
}
