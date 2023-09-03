import Image from 'next/image';
import { AppNavigation } from '@/navigation';
import Link from 'next/link';
import { formatDate } from '@/utils';
import { IPost } from '@/posts/read-model';
import classNames from 'classnames';

interface PostCardProps {
  post: IPost;
}

export const PostCard = ({ post }: PostCardProps) => {
  const referenceCategory = (categoryId: number) => ({
    id: categoryId,
    name: 'News',
    slug: 'news',
  });

  return (
    <Link
      href={AppNavigation.postDetails(post.slug)}
      className={classNames('flex flex-col transition', 'hover:-translate-y-6')}
    >
      <article className="flex-1 flex max-w-xl flex-col items-start justify-between shadow-lg rounded-md">
        <div className="w-full relative aspect-3/2 ">
          <Image
            src={post.imageUrl}
            alt="Post image"
            fill={true}
            className="rounded-t-md shadow-inner"
          />
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center flex-wrap -mx-1 mb-2">
              {post.categories.map(referenceCategory).map((category) => (
                <span
                  key={category.id}
                  className="p-1 text-xs font-medium text-indigo-600 mr-2"
                >
                  {category.name}
                </span>
              ))}
            </div>

            <div className="mb-5">
              <h3 className="text-lg font-semibold leading-6 mb-3 text-gray-900">
                {post.title}
              </h3>

              <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                {post.excerpt}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Image
              /* TODO Replace with actual URL once the data is available */
              src={post.author.imageUrl}
              alt="Post author image"
              className="h-10 w-10 rounded-full bg-gray-50"
              width="40"
              height="40"
            />

            <div className="text-sm leading-6 ml-4">
              <h5 className="font-semibold text-gray-900">
                {post.author.name}
              </h5>

              <p className="text-gray-500">
                <time dateTime={formatDate(post.createdAtDate, 'YYYY-MM-DD')}>
                  {formatDate(post.createdAtDate, 'M D, YYYY')}
                </time>{' '}
                · {post.minutesToRead} min read
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
