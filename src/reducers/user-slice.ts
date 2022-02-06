import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStatus, IGlobalAppStore, IStateStatus } from "../definitions";
import { IRecipe } from "../services/recipe/recipe.types";
import {
  getAllRecipesForUserFromUserContext,
  getUserById,
} from "../services/user/user.service";
import { TSecureUser } from "../services/user/user.types";

export interface IUserState {
  stateStatus: IStateStatus;
  users: TSecureUser[]; // not sure if we need this
  currentUserContext: TSecureUser | null;
  currentUserContextRecipes: IRecipe[];
}

const initialState: IUserState = {
  stateStatus: { status: EStatus.Idle },
  users: [],
  currentUserContext: null,
  currentUserContextRecipes: [],
};

export const setCurrentUserContextByIdAsync = createAsyncThunk(
  "user/setCurrentUserContextById",
  async ({ id }: { id: string }): Promise<TSecureUser> => {
    return getUserById({ id });
  }
);

export const setCurrentUserContextRecipes = createAsyncThunk(
  "user/setCurrentUserRecipes",
  async ({ user }: { user: TSecureUser }): Promise<IRecipe[]> => {
    return getAllRecipesForUserFromUserContext({ user });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentUserContextByIdAsync.pending, (state) => {
        state.stateStatus = {
          status: EStatus.Loading,
          message: "fetching current user context by id",
        };
      })
      .addCase(setCurrentUserContextByIdAsync.fulfilled, (state, action) => {
        state.stateStatus = {
          status: EStatus.Idle,
        };
        state.currentUserContext = action.payload;
      })
      .addCase(setCurrentUserContextByIdAsync.rejected, (state) => {
        state.stateStatus = {
          status: EStatus.Error,
          message: "Unable to get user context by id",
        };
      })
      .addCase(setCurrentUserContextRecipes.pending, (state) => {
        state.stateStatus = {
          status: EStatus.Loading,
        };
      })
      .addCase(setCurrentUserContextRecipes.fulfilled, (state, action) => {
        state.stateStatus = {
          status: EStatus.Idle,
        };
        state.currentUserContextRecipes = action.payload;
      })
      .addCase(setCurrentUserContextRecipes.rejected, (state) => {
        state.stateStatus = {
          status: EStatus.Error,
        };
      });
  },
});

export const selectCurrentUserContext = (state: IGlobalAppStore) =>
  state.user.currentUserContext;
export const selectCurrentUserContextRecipes = (state: IGlobalAppStore) =>
  state.user.currentUserContextRecipes;
export default userSlice.reducer;
