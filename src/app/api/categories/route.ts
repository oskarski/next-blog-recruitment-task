import { NextResponse } from 'next/server';
import { ICategoryDto, CategoryId } from '@/app/types';

export async function GET(
  request: Request,
): Promise<NextResponse<ICategoryDto[]>> {
  const allCategories: ICategoryDto[] = [
    {
      id: 3 as CategoryId,
      name: 'Books',
      slug: 'books',
    },
    {
      id: 4 as CategoryId,
      name: 'Accessories',
      slug: 'accessories',
    },
    {
      id: 5 as CategoryId,
      name: 'Music',
      slug: 'music',
    },
    {
      id: 6 as CategoryId,
      name: 'Toys',
      slug: 'toys',
    },
    {
      id: 7 as CategoryId,
      name: 'Audiobooks',
      slug: 'audiobooks',
    },
    {
      id: 8 as CategoryId,
      name: 'News',
      slug: 'news',
    },
  ];

  return NextResponse.json(allCategories);
}
