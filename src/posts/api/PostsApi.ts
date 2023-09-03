import { IPaginated, IPostsListQueryDto } from '@/app/types';
import { IPost } from '@/posts/read-model';
import { env } from '@/utils';

export class PostsApi {
  static async listPosts(
    queryDto: IPostsListQueryDto,
  ): Promise<IPaginated<IPost>> {
    const searchParams = new URLSearchParams();

    searchParams.set('page', `${queryDto.page}`);
    searchParams.set('perPage', `${queryDto.perPage || 10}`);
    if (queryDto.s) searchParams.set('s', queryDto.s);
    if (queryDto.category) searchParams.set('category', `${queryDto.category}`);

    const res = await fetch(
      `${env('NEXT_PUBLIC_API_BASE_URL')}/posts?${searchParams.toString()}`,
    );

    if (!res.ok) throw new Error('Failed to fetch data');

    return await res.json();
  }
}
