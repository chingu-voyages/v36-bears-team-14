import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStatus, IGlobalAppStore, IStateStatus } from "../definitions";
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
  async (): Promise<boolean> => {
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
        state.isAuthenticated = action.payload;
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
export default appSlice.reducer;
