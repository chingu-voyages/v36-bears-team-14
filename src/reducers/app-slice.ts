import { createSlice } from "@reduxjs/toolkit";
import { TSecureUser } from "../services/user/user.types";

export enum AppStateStatus {
  Idle = "idle",
  Loading = "loading",
  Error = "error",
}
interface IAppState {
  status: AppStateStatus;
  isAuthenticated: boolean;
  authenticatedUser: TSecureUser | null;
}

const initialState: IAppState = {
  status: AppStateStatus.Idle,
  isAuthenticated: false,
  authenticatedUser: null,
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
