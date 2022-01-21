export interface IRecipe {
  _id: string;
  name: string;
  description: string;
  likes: { [keyof: string]: Date };
  postedBy: string;
  images: Array<{ url: string }>;
  createdAt: Date;
  updatedAt: Date;
  ingredients: Array<TRecipeIngredient>;
  directions: Array<TRecipeStep>;
  cookTimeMinutes: number;
  prepTimeMinutes: number;
}

export type TRecipeIngredient = {
  name: string;
  quantity: number;
  unit: string;
};

export type TRecipeStep = {
  description: string;
  imageUrl?: string;
};

export type TRecipeCreationData = Pick<
  IRecipe,
  | "name"
  | "description"
  | "postedBy"
  | "ingredients"
  | "directions"
  | "cookTimeMinutes"
  | "prepTimeMinutes"
>;
