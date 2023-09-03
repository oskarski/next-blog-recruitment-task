import { CategoryId } from '@/app/types/categories';
import { IPaginationQueryDto } from '@/app/types/pagination';

export type PostId = number & { readonly __type: unique symbol };

export interface IPostAuthorDto {
  readonly name: string;
  readonly imageUrl: string;
}

export interface IPostDto {
  readonly id: PostId;
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly imageUrl: string;
  readonly categories: number[];
  readonly createdAt: string;
  readonly minutesToRead: number;
  readonly author: IPostAuthorDto;
}

export interface IPostsListQueryDto extends IPaginationQueryDto {
  readonly s?: string;
  readonly category?: CategoryId;
}
