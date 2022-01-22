import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  EStatus,
  ICheckSessionResponseData,
  IGlobalAppStore,
  IStateStatus,
} from "../definitions";
import { checkHasSession } from "../services/app/app.service";

import { TSecureUser } from "../services/user/user.types";

export interface IAppState {
  stateStatus: IStateStatus;
  isAuthenticated: boolean;
  authenticatedUser: TSecureUser | null;
}

const initialState: IAppState = {
  stateStatus: { status: EStatus.Idle },
  isAuthenticated: false,
  authenticatedUser: null,
};

export const checkHasSessionAsync = createAsyncThunk(
  "app/checkHasSession",
  async (): Promise<ICheckSessionResponseData> => {
    return checkHasSession();
  }
);
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkHasSessionAsync.pending, (state) => {
        state.stateStatus = {
          status: EStatus.Loading,
          message: "Checking session status",
        };
      })
      .addCase(checkHasSessionAsync.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.session;
        if (action.payload.sessionUser) {
          state.authenticatedUser = action.payload.sessionUser;
        }
        state.stateStatus = { status: EStatus.Idle };
      })
      .addCase(checkHasSessionAsync.rejected, (state) => {
        state.isAuthenticated = false;
        state.stateStatus = {
          status: EStatus.Error,
          message: "Unable to get session status",
        };
      });
  },
});

export const selectHasSession = (state: IGlobalAppStore) =>
  state.app.isAuthenticated;
export const selectAuthenticatedUser = (state: IGlobalAppStore) =>
  state.app.authenticatedUser;
export const selectAppStateStatus = (state: IGlobalAppStore): IStateStatus =>
  state.app.stateStatus;
export default appSlice.reducer;
