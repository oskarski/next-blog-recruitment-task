import { PageSection } from '@/components';
import { PostCard } from '@/posts';
import classNames from 'classnames';

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

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <PostCard />

          <PostCard />

          <PostCard />
        </div>
      </div>
    </main>
  );
}
