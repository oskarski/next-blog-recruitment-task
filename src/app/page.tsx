import { PageSection, Select } from '@/components';
import classNames from 'classnames';
import { PostCard } from '@/posts';
import Link from 'next/link';
import { CategoryId } from '@/app/types';
import { PostsApi } from '@/posts/api';
import { PaginatedSelector } from '@/utils';
import { PostSelector } from '@/posts/selectors';
import { CategoriesApi } from '@/categories/api';

interface HomePageProps {
  searchParams: {
    page?: string;
    s?: string;
    category?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const perPage = 6;
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 0;
  const searchQuery = searchParams.s;
  const category = searchParams.category as CategoryId | undefined;

  const categories = await CategoriesApi.listCategories();

  const paginatedPosts = await PostsApi.listPosts({
    page,
    perPage,
    s: searchQuery,
    category,
  }).then(PaginatedSelector(PostSelector(categories)));

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

        <form action="" className="mb-6">
          <div className="sm:flex sm:itemx-center">
            <input
              type="search"
              name="s"
              id="s"
              className={classNames(
                'block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 outline-none mb-3',
                'placeholder:text-gray-400',
                'focus:ring-2 focus:ring-inset focus:ring-indigo-600',
                'sm:text-sm sm:leading-6 sm:mb-0',
              )}
              placeholder="Search posts by title ..."
              defaultValue={searchParams.s}
            />

            <Select
              name="category"
              id="category"
              defaultValue={searchParams.category}
              className={classNames('w-full mb-3', 'sm:w-auto sm:ml-4 sm:mb-0')}
            >
              <option value="">All</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>

            <button
              className={classNames(
                'w-full bg-indigo-600 text-white py-2.5 px-3.5 rounded text-base',
                'sm:ml-4 sm:w-auto',
              )}
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex justify-between items-center mb-6">
          <div>
            {page > 0 && (
              <Link
                href={`?${new URLSearchParams({
                  ...searchParams,
                  page: `${page - 1}`,
                }).toString()}`}
                className="inline-block text-base font-medium text-gray-700 hover:text-gray-900"
              >
                Prev
              </Link>
            )}
          </div>

          <div>
            {(page + 1) * perPage < paginatedPosts.total && (
              <Link
                href={`?${new URLSearchParams({
                  ...searchParams,
                  page: `${page + 1}`,
                }).toString()}`}
              >
                Next
              </Link>
            )}
          </div>
        </div>

        <div
          className={classNames(
            'mx-auto grid grid-cols-1 gap-x-8 gap-y-16',
            'lg:mx-0 lg:max-w-none lg:grid-cols-3',
          )}
        >
          {paginatedPosts.data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
