import { ICategoryDto, IPostDto } from '@/app/types';

export interface IPost extends Omit<IPostDto, 'categories'> {
  createdAtDate: Date;
  categories: ICategoryDto[];
}
