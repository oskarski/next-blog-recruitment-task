import { PostCard } from '@/posts';
import classNames from 'classnames';

interface PostCardListProps {}

export const PostCardList = ({}: PostCardListProps) => {
  return (
    <div
      className={classNames(
        'mx-auto grid grid-cols-1 gap-x-8 gap-y-16',
        'lg:mx-0 lg:max-w-none lg:grid-cols-3',
      )}
    >
      <PostCard />

      <PostCard />

      <PostCard />
    </div>
  );
};
