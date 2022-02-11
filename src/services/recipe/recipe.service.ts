import { IRecipe } from "./recipe.types";
import axios from "axios";
import { API_URL } from "../../environment";

export const getRecipeById = async ({
  id,
}: {
  id: string;
}): Promise<IRecipe> => {
  const response = await axios({
    method: "GET",
    url: `${API_URL}/api/recipe/${id}`,
    withCredentials: true,
  });
  if (response.status === 200) {
    return response.data as IRecipe;
  } else {
    throw new Error("Unable to get recipe by id");
  }
};

export const getAllRecipes = async ({
  limit,
  skip,
}: {
  limit?: number;
  skip?: number;
}): Promise<IRecipe[]> => {
  const response = await axios({
    method: "GET",
    withCredentials: true,
    url: `${API_URL}/api/recipe/?context=allRecipes&limit=${limit ?? 0}&skip=${
      limit ?? 0
    }`,
  });

  if (response.status === 200) {
    return response.data as IRecipe[];
  } else {
    throw new Error("Unable to perform query for all recipes");
  }
};
