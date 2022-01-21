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
};

export interface IUserRegistrationDetails {
  email: string;
  firstName: string;
  lastName: string;
  plainTextPassword: string;
}
