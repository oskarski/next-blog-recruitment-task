export interface IPaginated<Dto> {
  readonly data: Dto[];
  readonly total: number;
}
