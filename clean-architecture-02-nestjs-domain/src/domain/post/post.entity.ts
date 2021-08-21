import { BaseEntity } from '@domain/common/base-entity';
import { Visibility } from '@domain/post/visibility.enum';
import { PostSlug } from './post-slug';
import { PostTitle } from './post-title';

export type PostProps = {
  title: PostTitle;
  slug: PostSlug;
  content: string;
  visibility: Visibility;
  authorId: string;
};

export class Post extends BaseEntity<PostProps> {
  get title(): PostTitle {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get visibility(): Visibility {
    return this.props.visibility;
  }

  get slug(): string {
    return this.props.slug.value;
  }

  get authorId(): string {
    return this.props.authorId;
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
    return new Post(props, id);
  }
}
