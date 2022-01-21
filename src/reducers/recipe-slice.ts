import { createSlice } from "@reduxjs/toolkit";
import { EStatus, IStateStatus } from "../definitions";

import { IRecipe } from "../services/recipe/recipe.types";

interface IRecipeState {
  stateStatus: IStateStatus;
  recipes: IRecipe[];
}
const initialState: IRecipeState = {
  stateStatus: { status: EStatus.Idle },
  recipes: [],
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
});

export default recipeSlice.reducer;
