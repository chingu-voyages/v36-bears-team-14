import {
  TSecureUser,
  TUserProfilePatchRequestData,
  TUserProfilePatchResponseData,
} from "./user.types";
import axios from "axios";
import { API_URL, AUTH_HEADER } from "../../environment";
import { IRecipe } from "../recipe/recipe.types";

export const getUserById = async ({
  id,
}: {
  id: string;
}): Promise<TSecureUser> => {
  const req = await axios({
    method: "GET",
    withCredentials: true,
    url: `${API_URL}/api/user/${id}`,
    headers: AUTH_HEADER,
  });
  if (req.status === 200) {
    return req.data as TSecureUser;
  } else {
    throw new Error("Unable to fetch user by id");
  }
};

export const getAllRecipesForUserId = async ({
  userId,
}: {
  userId: string;
}): Promise<IRecipe[]> => {
  console.log("get all recipes by id, 32 userId", userId);
  const req = await axios({
    method: "GET",
    url: `${API_URL}/api/user/${userId}/recipes`,
    withCredentials: true,
    headers: AUTH_HEADER,
  });
  if (req.status === 200) {
    return req.data;
  } else {
    console.error(
      `there was an error fetching recipes for this user context for id:`,
      userId
    );
    return [];
  }
};

export const patchUserProfileDataByUserId = async ({
  id,
  bio,
  favoriteFoods,
  photoUrl,
  onSuccess,
  onError,
}: TUserProfilePatchRequestData): Promise<TUserProfilePatchResponseData> => {
  const req = await axios({
    method: "PATCH",
    url: `${API_URL}/api/user/${id}`,
    withCredentials: true,
    headers: AUTH_HEADER,
    data: {
      bio,
      favoriteFoods,
      photoUrl,
    },
  });
  if (req.status === 200) {
    const response = req.data as TUserProfilePatchResponseData;
    onSuccess && onSuccess({ responseData: response });
    return response;
  } else {
    onError && onError({ message: `Unable to patch user` });
    throw new Error(`Unable to patch user`);
  }
};
