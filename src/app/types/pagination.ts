export interface IPaginated<Dto> {
  readonly data: Dto[];
  readonly total: number;
}

export interface IPaginationQueryDto {
  readonly page: number;
  readonly perPage?: number;
}
