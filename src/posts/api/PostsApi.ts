import { IPaginated } from '@/app/types';
import { IPost } from '@/posts/read-model';
import { env } from '@/utils';

export class PostsApi {
  static async listPosts(): Promise<IPaginated<IPost>> {
    const res = await fetch(`${env('NEXT_PUBLIC_API_BASE_URL')}/posts`);

    if (!res.ok) throw new Error('Failed to fetch data');

    return await res.json();
  }
}
