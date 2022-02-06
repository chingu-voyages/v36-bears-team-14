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
export interface IUserRegistrationRequest extends TUserRegistrationDetails {
  onSuccess?: ({ user }: { user: TSecureUser }) => void;
  onError?: ({ message }: { message: string }) => void;
}
