import Image from 'next/image';
import { AppNavigation } from '@/navigation';
import Link from 'next/link';
import { formatDate } from '@/utils';

export const PostCard = () => {
  const post = {
    id: 126,
    slug: 'libero-exercitationem-cum-veniam',
    title: 'Libero exercitationem cum veniam',
    excerpt:
      'Donec ut orci porttitor, sagittis mauris nec, semper metus. Vestibulum eget justo viverra, lobortis est in, pretium enim.',
    imageUrl: 'https://picsum.photos/id/237/800/600',
    categories: [7, 8],
    createdAt: new Date(),
    minutesToRead: 6,
    author: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  };

  const referenceCategory = (categoryId: number) => ({
    id: categoryId,
    name: 'News',
    slug: 'news',
  });

  return (
    <article className="flex max-w-xl flex-col items-start justify-between shadow-lg rounded-md">
      <div className="w-full relative aspect-3/2 ">
        <Image
          src={post.imageUrl}
          alt="Post image"
          fill={true}
          className="rounded-t-md shadow-inner"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center flex-wrap -mx-1 mb-2">
          {post.categories.map(referenceCategory).map((category) => (
            <Link
              key={category.id}
              href={AppNavigation.categoryDetails(category.slug)}
              className="p-1 text-xs font-medium text-indigo-600 mr-2"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="mb-5">
          <Link
            href={AppNavigation.postDetails(post.slug)}
            className="inline-block mb-3 text-gray-900 hover:text-gray-600"
          >
            <h3 className="text-lg font-semibold leading-6">{post.title}</h3>
          </Link>

          <p className="line-clamp-3 text-sm leading-6 text-gray-600">
            {post.excerpt}
          </p>
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
            <h5 className="font-semibold text-gray-900">{post.author.name}</h5>

            <p className="text-gray-500">
              <time dateTime={formatDate(post.createdAt, 'YYYY-MM-DD')}>
                {formatDate(post.createdAt, 'M D, YYYY')}
              </time>{' '}
              · {post.minutesToRead} min read
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
