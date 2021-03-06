import {
  IRecipe,
  TRecipeCreationData,
  TRecipePayloadData,
  TRecipeToggleLikeAction,
} from "./recipe.types";
import axios from "axios";
import { API_URL, AUTH_HEADER } from "../../environment";

export const getRecipeById = async ({
  id,
}: {
  id: string;
}): Promise<IRecipe> => {
  const response = await axios({
    method: "GET",
    url: `${API_URL}/api/recipe/${id}`,
    withCredentials: true,
    headers: AUTH_HEADER,
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
    headers: AUTH_HEADER,
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

export const postNewRecipe = async ({
  name,
  description,
  cookTimeMinutes,
  prepTimeMinutes,
  directions,
  ingredients,
  imageUrl,
  onError,
  onSuccess,
}: TRecipeCreationData): Promise<IRecipe> => {
  const req = await axios({
    method: "POST",
    url: `${API_URL}/api/recipe`,
    withCredentials: true,
    headers: AUTH_HEADER,
    data: {
      name,
      description,
      cookTimeMinutes,
      prepTimeMinutes,
      directions,
      ingredients,
      imageUrl,
    },
  });
  if (req.status === 200) {
    onSuccess && onSuccess(req.data);
    return req.data;
  } else {
    onError && onError(` Problem with posting new recipe: ${req.statusText}`);
    throw new Error("Problem posting new recipe");
  }
};

export const toggleLikeRecipe = async ({
  id,
}: {
  id: string;
}): Promise<TRecipeToggleLikeAction> => {
  const req = await axios({
    method: "PATCH",
    withCredentials: true,
    url: `${API_URL}/api/recipe/${id}/like`,
    headers: AUTH_HEADER,
  });
  if (req.status === 200) {
    return req.data;
  } else {
    throw new Error(`Unable to toggle like/unlike for recipe by id ${id}`);
  }
};

export const deleteRecipesByArrayOfIds = async ({
  recipeIds,
}: {
  recipeIds: string[];
}): Promise<IRecipe[]> => {
  if (recipeIds && recipeIds.length > 0) {
    const res = await axios({
      method: "DELETE",
      url: `${API_URL}/api/recipe`,
      withCredentials: true,
      headers: AUTH_HEADER,
      data: {
        recipeIds,
      },
    });

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("Unable to batch delete");
    }
  }
  throw new Error("Unable to batch delete");
};

export const patchRecipe = async ({
  recipeId,
  payload,
}: {
  recipeId: string;
  payload: TRecipePayloadData;
}): Promise<IRecipe> => {
  const req = await axios({
    method: "PATCH",
    url: `${API_URL}/api/recipe/${recipeId}/update`,
    withCredentials: true,
    headers: AUTH_HEADER,
    data: {
      name: payload.name,
      description: payload.description,
      cookTimeMinutes: payload.cookTimeMinutes,
      prepTimeMinutes: payload.prepTimeMinutes,
      imageUrl: payload.imageUrl,
      directions: payload.directions,
      ingredients: payload.ingredients,
    },
  });
  if (req.status === 200) {
    payload.onSuccess && payload.onSuccess(req.data);
    return req.data;
  } else {
    payload.onError && payload.onError("Unable to patch this recipe");
  }
  throw new Error("Unable to patch this recipe");
};
