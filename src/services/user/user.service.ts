import {
  TSecureUser,
  TUserProfilePatchRequestData,
  TUserProfilePatchResponseData,
} from "./user.types";
import axios from "axios";
import { API_URL } from "../../environment";
import { getRecipeById } from "../recipe/recipe.service";
import { IRecipe } from "../recipe/recipe.types";

export const getUserById = async ({
  id,
}: {
  id: string;
}): Promise<TSecureUser> => {
  const req = await axios({
    method: "GET",
    withCredentials: true,
    url: `${API_URL}/api/user/${id}`,
  });
  if (req.status === 200) {
    return req.data as TSecureUser;
  } else {
    throw new Error("Unable to fetch user by id");
  }
};

export const getAllRecipesForUserFromUserContext = async ({
  user,
}: {
  user: TSecureUser;
}): Promise<IRecipe[]> => {
  if (!user.recipes) return [];
  const userRecipes = Object.keys(user.recipes);
  if (userRecipes.length === 0) return [];
  const recipeObjects = userRecipes.map((recipeId) =>
    getRecipeById({ id: recipeId })
  );
  try {
    const fetchedRecipes = await Promise.all(recipeObjects);
    return fetchedRecipes;
  } catch (exception) {
    throw new Error("Unable to get all recipes for user by context");
  }
};

export const patchUserProfileDataByUserId = async ({
  id,
  bio,
  favoriteFoods,
  photoUrl,
  onSuccess,
  onError,
}: TUserProfilePatchRequestData): Promise<TUserProfilePatchResponseData> => {
  const req = await axios({
    method: "PATCH",
    url: `${API_URL}/api/user/${id}`,
    withCredentials: true,
    data: {
      bio,
      favoriteFoods,
      photoUrl,
    },
  });
  if (req.status === 200) {
    const response = req.data as TUserProfilePatchResponseData;
    onSuccess && onSuccess({ responseData: response });
    return response;
  } else {
    onError && onError({ message: `Unable to patch user ` });
    throw new Error(`Unable to patch user`);
  }
};
