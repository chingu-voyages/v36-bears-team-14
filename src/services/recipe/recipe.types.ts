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
  | "ingredients"
  | "directions"
  | "cookTimeMinutes"
  | "prepTimeMinutes"
> & {
  imageUrl?: string;
  onSuccess?: (data: IRecipe) => void;
  onError?: (message: string) => void;
};

export type TRecipeToggleLikeAction = {
  actionTaken: "like" | "unlike";
  updatedRecipeDocument: IRecipe;
};
