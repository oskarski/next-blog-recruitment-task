export type CategoryId = number & { readonly __type: unique symbol };

export interface ICategoryDto {
  readonly id: CategoryId;
  readonly slug: string;
  readonly name: string;
}
