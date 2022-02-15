import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/app-slice";
import recipeReducer from "./reducers/recipe-slice";
export const store = configureStore({
  reducer: {
    app: appReducer,
    recipe: recipeReducer,
  },
});
