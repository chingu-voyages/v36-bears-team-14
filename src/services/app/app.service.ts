import axios from "axios";
import { ICheckSessionResponseData } from "../../definitions";
import { API_URL } from "../../environment";
import {
  IUserRegistrationRequest,
  TSecureUser,
  TUserLoginRequest,
} from "../user/user.types";

export const checkHasSession = async (): Promise<ICheckSessionResponseData> => {
  const sessionResponse = await axios({
    method: "GET",
    url: `${API_URL}/api/authentication/session`,
    withCredentials: true,
  });
  if (sessionResponse.status === 200) {
    if (sessionResponse.data.session && sessionResponse.data.session === true) {
      const sessionUserResponse = await axios({
        method: "GET",
        url: `${API_URL}/api/user/me`,
        withCredentials: true,
      });
      if (sessionUserResponse.status === 200) {
        return {
          session: sessionResponse.data.session,
          sessionUser: sessionUserResponse.data,
        };
      }
    }
  }
  return { session: false, sessionUser: null };
};

export const logInUser = async ({
  email,
  plainTextPassword,
  onSuccess,
}: TUserLoginRequest): Promise<TSecureUser> => {
  const response = await axios({
    method: "POST",
    url: `${API_URL}/api/authentication/local`,
    withCredentials: true,
    data: {
      email,
      password: plainTextPassword,
    },
  });
  if (response.status === 200) {
    // A successful response should send an id property in the response body
    onSuccess();
    return response.data as TSecureUser;
  } else {
    throw new Error("Log in failed");
  }
};

export const logOutUser = async (): Promise<void> => {
  const response = await axios({
    method: "POST",
    url: `${API_URL}/api/authentication/logout`,
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Unable to do log out request");
  }
};

export const registerNewUser = async ({
  email,
  firstName,
  lastName,
  plainTextPassword,
  onSuccess,
  onError,
}: IUserRegistrationRequest): Promise<TSecureUser> => {
  const response = await axios({
    method: "POST",
    url: `${API_URL}/api/authentication/local/register`,
    withCredentials: true,
    data: {
      email,
      firstName,
      lastName,
      password: plainTextPassword,
    },
  });

  if (response.status === 200) {
    const data = response.data as TSecureUser;
    onSuccess && onSuccess({ user: data });
    return data;
  } else {
    onError && onError({ message: response.data.error });
    throw new Error(`Registration failed: ${response.data.error}`);
  }
};
