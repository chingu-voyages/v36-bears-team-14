import { IAppState } from "./reducers/app-slice";
import { IRecipeState } from "./reducers/recipe-slice";
import { TSecureUser } from "./services/user/user.types";

export enum EStatus {
  Idle = "idle",
  Loading = "loading",
  Error = "error",
}

export interface IStateStatus {
  status: EStatus;
  message?: string;
}

export interface IGlobalAppStore {
  app: IAppState;
  recipe: IRecipeState;
}

export interface ICheckSessionResponseData {
  session: boolean;
  sessionUser?: TSecureUser | null;
}
