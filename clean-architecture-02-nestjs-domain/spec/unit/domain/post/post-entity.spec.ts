import { PostTitle } from '@domain/post/post-title';
import { Post } from '@domain/post/post.entity';
import { Visibility } from '@domain/post/visibility.enum';

describe('post-entity', () => {
  const postProps = {
    title: PostTitle.create({ value: 'title' }),
    authorId: 'authorId',
    content: 'content',
    visibility: Visibility.PUBLIC,
  };

  describe('when creating a new post-entity', () => {
    test('then it should return a new post', () => {
      const post = Post.create(postProps, 'id');

      expect(post).toBeDefined();
      expect(post.title).toBe(postProps.title);
      expect(post.visibility).toBe(postProps.visibility);
    });
  });

  describe('when invoking isOwner', () => {
    let post: Post;

    beforeEach(() => {
      post = Post.create(postProps, 'id');
    });

    test('then it should return true when post belongs to provided user id', () => {
      const isOwner = post.isAuthor('authorId');

      expect(isOwner).toBeTruthy();
    });

    test('then it should return false when post does not belong to provided user id', () => {
      const isOwner = post.isAuthor('woef');

      expect(isOwner).toBeFalsy();
    });
  });

  describe('when invoking canVisit', () => {
    let post: Post;

    beforeEach(() => {
      post = Post.create(postProps, 'id');
    });

    describe('as post owner', () => {
      test('then it should return true at all times', () => {
        const canVisit = post.canVisit('authorId');

        expect(canVisit).toBeTruthy();
      });
    });

    describe('as user', () => {
      test('then it should return false when private', () => {
        post = Post.create(
          { ...postProps, visibility: Visibility.PRIVATE },
          'id',
        );

        const canVisit = post.canVisit('userId');

        expect(canVisit).toBeFalsy();
      });

      test('then it should return true when public', () => {
        post = Post.create(
          { ...postProps, visibility: Visibility.PUBLIC },
          'id',
        );

        const canVisit = post.canVisit('userId');

        expect(canVisit).toBeTruthy();
      });

      test('then it should return true when unlisted', () => {
        post = Post.create(
          { ...postProps, visibility: Visibility.UNLISTED },
          'id',
        );

        const canVisit = post.canVisit('userId');

        expect(canVisit).toBeTruthy();
      });
    });
  });
});
