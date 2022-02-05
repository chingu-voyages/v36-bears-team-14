import { TSecureUser } from "./user.types";
import axios from "axios";
import { API_URL } from "../../environment";

export const getUserById = async ({
  id,
}: {
  id: string;
}): Promise<TSecureUser> => {
  const req = await axios({
    method: "GET",
    withCredentials: true,
    url: `${API_URL}/api/user/${id}`,
  });
  if (req.status === 200) {
    return req.data as TSecureUser;
  } else {
    throw new Error("Unable to fetch user by id");
  }
};
