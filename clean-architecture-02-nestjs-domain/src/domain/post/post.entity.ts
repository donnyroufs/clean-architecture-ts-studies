import { BaseEntity } from '@domain/common/base-entity';
import { Visibility } from '@domain/post/visibility.enum';

export type PostProps = {
  title: string;
  content: string;
  visibility: Visibility;
  authorId: string;
};

export class Post extends BaseEntity<PostProps> {
  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get visibility() {
    return this.props.visibility;
  }

  private constructor(props: PostProps, id?: string) {
    super(props, id);
  }

  public isAuthor(userId: string) {
    return userId === this.props.authorId;
  }

  public canVisit(userId: string) {
    const isAuthor = this.isAuthor(userId);

    if (!isAuthor && this.visibility === Visibility.PRIVATE) {
      return false;
    }

    return true;
  }

  static create(props: PostProps, id?: string) {
    const post = new Post(props, id);

    return post;
  }
}
