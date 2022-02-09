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
