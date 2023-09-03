import { IPostDto } from '@/app/types';
import { IPost } from '@/posts/read-model';

export const PostSelector = (dto: IPostDto): IPost => {
  return {
    ...dto,
    createdAtDate: new Date(dto.createdAt),
  };
};
