import { ICategoryDto, IPostDto } from '@/app/types';
import { IPost } from '@/posts/read-model';

export const PostSelector =
  (categories: ICategoryDto[]) =>
  (dto: IPostDto): IPost => {
    return {
      ...dto,
      createdAtDate: new Date(dto.createdAt),
      categories: dto.categories
        .map((categoryId) =>
          categories.find((category) => category.id === categoryId),
        )
        .filter((category) => !!category) as ICategoryDto[],
    };
  };
