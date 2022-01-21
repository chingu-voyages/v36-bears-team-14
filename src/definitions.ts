export enum EStatus {
  Idle = "idle",
  Loading = "loading",
  Error = "error",
}

export interface IStateStatus {
  status: EStatus;
  message?: string;
}
