import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStatus, IGlobalAppStore, IStateStatus } from "../definitions";
import { getRecipeById } from "../services/recipe/recipe.service";

import { IRecipe } from "../services/recipe/recipe.types";

export interface IRecipeState {
  stateStatus: IStateStatus;
  recipes: IRecipe[];
  currentRecipeContext: IRecipe | null;
}
const initialState: IRecipeState = {
  stateStatus: { status: EStatus.Idle },
  recipes: [],
  currentRecipeContext: null,
};

export const setCurrentRecipeContextByIdAsync = createAsyncThunk(
  "recipe/setCurrentRecipeContextById",
  async ({ id }: { id: string }): Promise<IRecipe> => {
    return getRecipeById({ id });
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
      });
  },
});

export const selectCurrentRecipeContext = (state: IGlobalAppStore) =>
  state.recipe.currentRecipeContext;
export const { clearCurrentRecipeContext } = recipeSlice.actions;
export default recipeSlice.reducer;
