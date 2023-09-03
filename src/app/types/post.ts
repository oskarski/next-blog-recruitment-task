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
