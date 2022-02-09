export type TSecureUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  recipes: { [keyof: string]: Date };
  favoriteFoods: Array<string>;
  createdAt: Date;
  updatedAt: Date;
  photoUrl?: string;
};

export type TUserRegistrationDetails = {
  email: string;
  firstName: string;
  lastName: string;
  plainTextPassword: string;
};

export type TUserLoginRequest = Pick<
  TUserRegistrationDetails,
  "email" | "plainTextPassword"
> & {
  onSuccess: () => void;
};

export type TUserProfilePatchRequestData = {
  id: string;
  bio?: {
    action: "update" | "delete";
    data: string;
  };
  favoriteFoods?: {
    action: "update" | "delete";
    data: string[];
  };
  photoUrl?: {
    action: "update" | "delete";
    data: string;
  };
  onSuccess?: ({
    responseData,
  }: {
    responseData: TUserProfilePatchResponseData;
  }) => void;
  onError?: ({ message }: { message: string }) => void;
};

export type TUserProfilePatchResponseData = {
  user: TSecureUser;
  profileDataUpdated: string[];
};
export interface IUserRegistrationRequest extends TUserRegistrationDetails {
  onSuccess?: ({ user }: { user: TSecureUser }) => void;
  onError?: ({ message }: { message: string }) => void;
}
