import { TSecureUser } from "./user.types";
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
