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

export const securePatchUserDataByUserId = async ({
  id,
  updateType,
  payload,
  onSuccess,
  onError,
}: {
  id: string;
  updateType: "name" | "password";
  payload: { password: string } | { firstName: string; lastName: string };
  onSuccess?: (updatedUser: TSecureUser) => void;
  onError?: (message: string) => void;
}): Promise<{ updateType: "name" | "password"; user: TSecureUser }> => {
  try {
    const req = await axios({
      method: "PATCH",
      url: `${API_URL}/api/user/${id}/secure`,
      withCredentials: true,
      headers: AUTH_HEADER,
      data: {
        updateType: updateType,
        payload,
      },
    });
    if (req.status === 200) {
      onSuccess && onSuccess(req.data);
    } else {
      onError &&
        onError(`Unable to update secure profile data: ${req.statusText}`);
    }
  } catch (exception: any) {
    onError &&
      onError(`Unable to update secure profile data: ${exception.message}`);
  }
  throw new Error("Unable to update secure profile data");
};
