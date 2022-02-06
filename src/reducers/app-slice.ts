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
  registerNewUser,
} from "../services/app/app.service";
import { EAppScene } from "../services/app/app.types";

import {
  IUserRegistrationRequest,
  TSecureUser,
  TUserLoginRequest,
  TUserRegistrationDetails,
} from "../services/user/user.types";

export interface IAppState {
  stateStatus: IStateStatus;
  logInStatus: IStateStatus;
  registrationStatus: IStateStatus;
  isAuthenticated: boolean;
  authenticatedUser: TSecureUser | null;
  scene: EAppScene;
}

const initialState: IAppState = {
  stateStatus: { status: EStatus.Idle },
  logInStatus: { status: EStatus.Idle },
  registrationStatus: { status: EStatus.Idle },
  isAuthenticated: false,
  authenticatedUser: null,
  scene: EAppScene.PlaceHolder,
};

const setAuthenticatedUserInLocalStorage = (data: any) => {
  window.sessionStorage.setItem("authenticatedUser", JSON.stringify(data));
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

export const registerNewUserAsync = createAsyncThunk(
  "app/registerNewUser",
  async ({
    email,
    firstName,
    lastName,
    plainTextPassword,
    onSuccess,
    onError,
  }: IUserRegistrationRequest) => {
    return registerNewUser({
      email,
      firstName,
      lastName,
      plainTextPassword,
      onSuccess,
      onError,
    });
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
          setAuthenticatedUserInLocalStorage(action.payload.sessionUser);
        }
        state.stateStatus = { status: EStatus.Idle };
      })
      .addCase(checkHasSessionAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.stateStatus = {
          status: EStatus.Error,
          message: `Unable to get session status: ${action.error.message}`,
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
        setAuthenticatedUserInLocalStorage(action.payload);
        state.isAuthenticated = true;
      })
      .addCase(logInUserAsync.rejected, (state, action) => {
        state.logInStatus = {
          status: EStatus.Error,
          message: `Log in failed: ${action.error.message}`,
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
      })
      .addCase(registerNewUserAsync.pending, (state) => {
        state.registrationStatus = {
          status: EStatus.Loading,
          message: "Registering user...",
        };
      })
      .addCase(registerNewUserAsync.fulfilled, (state, action) => {
        state.registrationStatus = {
          status: EStatus.Idle,
          message: "",
        };
        setAuthenticatedUserInLocalStorage(action.payload);
        state.isAuthenticated = true;
        state.authenticatedUser = action.payload;
      })
      .addCase(registerNewUserAsync.rejected, (state, action) => {
        state.registrationStatus = {
          status: EStatus.Error,
          message: `There was a problem registering the account. ${action.error.message}`,
        };
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

export const selectRegistrationStatus = (
  state: IGlobalAppStore
): IStateStatus => state.app.registrationStatus;
export const selectCurrentScene = (state: IGlobalAppStore) => state.app.scene;

export const { setScene, clearLogInErrorStatus } = appSlice.actions;
export default appSlice.reducer;
