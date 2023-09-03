import { IPaginated } from '@/app/types';

export const PaginatedSelector =
  <Dto, ReadModel>(Selector: (dto: Dto) => ReadModel) =>
  (dto: IPaginated<Dto>): IPaginated<ReadModel> => {
    return {
      ...dto,
      data: dto.data.map(Selector),
    };
  };
