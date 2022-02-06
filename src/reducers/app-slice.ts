import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  EStatus,
  ICheckSessionResponseData,
  IGlobalAppStore,
  IStateStatus,
} from "../definitions";
import {
  checkHasSession,
  logInUser,
  logOutUser,
} from "../services/app/app.service";
import { EAppScene } from "../services/app/app.types";

import { TSecureUser, TUserLoginRequest } from "../services/user/user.types";

export interface IAppState {
  stateStatus: IStateStatus;
  logInStatus: IStateStatus;
  isAuthenticated: boolean;
  authenticatedUser: TSecureUser | null;
  scene: EAppScene;
}

const initialState: IAppState = {
  stateStatus: { status: EStatus.Idle },
  logInStatus: { status: EStatus.Idle },
  isAuthenticated: false,
  authenticatedUser: null,
  scene: EAppScene.PlaceHolder,
};

export const checkHasSessionAsync = createAsyncThunk(
  "app/checkHasSession",
  async (): Promise<ICheckSessionResponseData> => {
    return checkHasSession();
  }
);

export const logInUserAsync = createAsyncThunk(
  "app/userLogIn",
  async ({
    email,
    plainTextPassword,
    onSuccess,
  }: TUserLoginRequest): Promise<TSecureUser> => {
    return logInUser({ email, plainTextPassword, onSuccess });
  }
);

export const logOutUserAsync = createAsyncThunk(
  "app/logOutUser",
  async (): Promise<void> => {
    return logOutUser();
  }
);
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setScene(state, action: { payload: EAppScene }) {
      state.scene = action.payload;
    },
    clearLogInErrorStatus(state) {
      state.logInStatus = {
        status: EStatus.Idle,
        message: "",
      };
    },
  },
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
      })
      .addCase(logInUserAsync.pending, (state) => {
        state.logInStatus = {
          status: EStatus.Loading,
          message: "Logging in...",
        };
      })
      .addCase(logInUserAsync.fulfilled, (state, action) => {
        state.logInStatus = { status: EStatus.Idle, message: "" };
        state.authenticatedUser = action.payload;
        window.sessionStorage.setItem(
          "authenticatedUser",
          JSON.stringify(action.payload)
        );
        state.isAuthenticated = true;
      })
      .addCase(logInUserAsync.rejected, (state) => {
        state.logInStatus = {
          status: EStatus.Error,
          message: "Log in failed. Check your credentials.",
        };
      })
      .addCase(logOutUserAsync.pending, (state) => {
        state.stateStatus = {
          status: EStatus.Loading,
          message: "Logging out",
        };
      })
      .addCase(logOutUserAsync.fulfilled, (state) => {
        state.stateStatus = { status: EStatus.Idle };
        window.sessionStorage.clear();
        state.authenticatedUser = null;
        state.isAuthenticated = false;
      })
      .addCase(logOutUserAsync.rejected, (state) => {
        state.stateStatus = { status: EStatus.Error };
        window.sessionStorage.clear();
        state.authenticatedUser = null;
        state.isAuthenticated = false;
      });
  },
});

export const selectIsAuthenticated = (state: IGlobalAppStore) =>
  state.app.isAuthenticated;
export const selectAuthenticatedUser = (state: IGlobalAppStore) =>
  state.app.authenticatedUser;
export const selectAppStateStatus = (state: IGlobalAppStore): IStateStatus =>
  state.app.stateStatus;
export const selectLoginStateStatus = (state: IGlobalAppStore): IStateStatus =>
  state.app.logInStatus;
export const selectCurrentScene = (state: IGlobalAppStore) => state.app.scene;

export const { setScene, clearLogInErrorStatus } = appSlice.actions;
export default appSlice.reducer;
