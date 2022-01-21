import { createSlice } from "@reduxjs/toolkit";
import { EStatus, IStateStatus } from "../definitions";

import { TSecureUser } from "../services/user/user.types";

interface IAppState {
  stateStatus: IStateStatus;
  isAuthenticated: boolean;
  authenticatedUser: TSecureUser | null;
}

const initialState: IAppState = {
  stateStatus: { status: EStatus.Idle },
  isAuthenticated: false,
  authenticatedUser: null,
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
