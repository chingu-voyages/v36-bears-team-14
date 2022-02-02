export enum PhotoUploadType {
  ProfilePhoto = "profilePhoto",
  RecipePhoto = "recipePhoto",
  RecipeStepPhoto = "recipeStepPhoto",
}

export type TProfilePhotoUploadContext = {
  id: string;
};

export type TRecipePhotoUploadContext = {
  id: string;
};

export type TRecipeDirectionStepUploadContext = {
  id: string;
  direction?: string; // TBD 🤔
};

export type FileData = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
};

export type TFileList = {
  [type in number]: FileData;
};
