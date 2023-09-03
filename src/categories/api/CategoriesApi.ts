import { ICategoryDto } from '@/app/types';
import { env } from '@/utils';

export class CategoriesApi {
  static async listCategories(): Promise<ICategoryDto[]> {
    const res = await fetch(`${env('NEXT_PUBLIC_API_BASE_URL')}/categories`);

    if (!res.ok) throw new Error('Failed to fetch data');

    return await res.json();
  }
}
