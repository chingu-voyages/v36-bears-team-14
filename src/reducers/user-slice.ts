import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStatus, IGlobalAppStore, IStateStatus } from "../definitions";
import { getUserById } from "../services/user/user.service";
import { TSecureUser } from "../services/user/user.types";

export interface IUserState {
  stateStatus: IStateStatus;
  users: TSecureUser[]; // not sure if we need this
  currentUserContext: TSecureUser | null;
}

const initialState: IUserState = {
  stateStatus: { status: EStatus.Idle },
  users: [],
  currentUserContext: null,
};

export const setCurrentUserContextByIdAsync = createAsyncThunk(
  "user/setCurrentUserContextById",
  async ({ id }: { id: string }): Promise<TSecureUser> => {
    return getUserById({ id });
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
      });
  },
});

export const selectCurrentUserContext = (state: IGlobalAppStore) =>
  state.user.currentUserContext;
export default userSlice.reducer;
