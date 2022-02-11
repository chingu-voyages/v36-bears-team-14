import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStatus, IGlobalAppStore, IStateStatus } from "../definitions";
import {
  getAllRecipes,
  getRecipeById,
} from "../services/recipe/recipe.service";

import { IRecipe } from "../services/recipe/recipe.types";

export interface IRecipeState {
  stateStatus: IStateStatus;
  recipes: IRecipe[];
  currentRecipeContext: IRecipe | null;
  limit: number;
  skip: number;
}
const initialState: IRecipeState = {
  stateStatus: { status: EStatus.Idle },
  recipes: [],
  currentRecipeContext: null,
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

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    clearCurrentRecipeContext(state) {
      state.currentRecipeContext = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentRecipeContextByIdAsync.pending, (state) => {
        state.stateStatus = {
          status: EStatus.Loading,
          message: "fetching recipe by id",
        };
      })
      .addCase(setCurrentRecipeContextByIdAsync.fulfilled, (state, action) => {
        state.currentRecipeContext = action.payload;
        state.stateStatus = {
          status: EStatus.Idle,
        };
      })
      .addCase(setCurrentRecipeContextByIdAsync.rejected, (state) => {
        state.stateStatus = {
          status: EStatus.Error,
          message: "Unable to get recipe by id",
        };
      })
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
      });
  },
});

export const selectCurrentRecipeContext = (state: IGlobalAppStore) =>
  state.recipe.currentRecipeContext;
export const selectRecipeStateStatus = (state: IGlobalAppStore) =>
  state.recipe.stateStatus;

export const selectRecipes = (state: IGlobalAppStore) => state.recipe.recipes;
export const { clearCurrentRecipeContext } = recipeSlice.actions;
export default recipeSlice.reducer;
