import { PageSection } from '@/components';
import classNames from 'classnames';
import { PostCardList } from '@/posts';

export default function HomePage() {
  return (
    <main
      className={classNames(
        'bg-white min-h-screen pt-16 pb-8',
        'sm:pt-20 sm:pb-10',
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <PageSection
          title="From the blog"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta dignissimos harum impedit quia voluptatem."
          className="mb-10"
        />

        <PostCardList />
      </div>
    </main>
  );
}
