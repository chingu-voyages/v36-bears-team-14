import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStatus, IGlobalAppStore, IStateStatus } from "../definitions";
import {
  getAllRecipes,
  getRecipeById,
  postNewRecipe,
} from "../services/recipe/recipe.service";

import { IRecipe, TRecipeCreationData } from "../services/recipe/recipe.types";

export interface IRecipeState {
  stateStatus: IStateStatus;
  recipes: IRecipe[];
  limit: number;
  skip: number;
}
const initialState: IRecipeState = {
  stateStatus: { status: EStatus.Idle },
  recipes: [],
  limit: 0,
  skip: 0,
};

export const setCurrentRecipeContextByIdAsync = createAsyncThunk(
  "recipe/setCurrentRecipeContextById",
  async ({ id }: { id: string }): Promise<IRecipe> => {
    return getRecipeById({ id });
  }
);

export const getAllRecipesAsync = createAsyncThunk(
  "recipe/getAllRecipes",
  async ({
    limit,
    skip,
  }: {
    limit?: number;
    skip?: number;
  }): Promise<IRecipe[]> => {
    return getAllRecipes({ limit, skip });
  }
);

export const postNewRecipeAsync = createAsyncThunk(
  "recipe/postNewRecipe",
  async ({
    name,
    description,
    cookTimeMinutes,
    prepTimeMinutes,
    directions,
    ingredients,
    imageUrl,
    onError,
    onSuccess,
  }: TRecipeCreationData) => {
    return postNewRecipe({
      name,
      description,
      cookTimeMinutes,
      prepTimeMinutes,
      directions,
      ingredients,
      imageUrl,
      onError,
      onSuccess,
    });
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRecipesAsync.pending, (state) => {
        state.stateStatus = {
          status: EStatus.Loading,
          message: "getting all recipes",
        };
      })
      .addCase(getAllRecipesAsync.fulfilled, (state, action) => {
        state.stateStatus = {
          status: EStatus.Idle,
        };
        // This logic needs to be updated for limit, skip functionality
        state.recipes = action.payload;
      })
      .addCase(getAllRecipesAsync.rejected, (state, action) => {
        state.stateStatus = {
          status: EStatus.Error,
          message: `Unable to get recipe by id: ${action.error.message}`,
        };
      })
      .addCase(postNewRecipeAsync.pending, (state) => {
        state.stateStatus = {
          status: EStatus.Loading,
          message: "posting new recipe",
        };
      })
      .addCase(postNewRecipeAsync.fulfilled, (state) => {
        state.stateStatus = {
          status: EStatus.Idle,
        };
        // We won't do anything with the payload - we'll re-render the page with the onSuccess callback
      })
      .addCase(postNewRecipeAsync.rejected, (state, action) => {
        state.stateStatus = {
          status: EStatus.Error,
          message: `Unable to post new recipe: ${action.error.message}`,
        };
      });
  },
});

export const selectRecipeStateStatus = (state: IGlobalAppStore) =>
  state.recipe.stateStatus;

export const selectRecipes = (state: IGlobalAppStore) => state.recipe.recipes;

export default recipeSlice.reducer;
