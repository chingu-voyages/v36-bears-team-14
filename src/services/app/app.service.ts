import axios from "axios";
import { API_URL } from "../../environment";

export const checkHasSession = async (): Promise<boolean> => {
  const response = await axios({
    method: "GET",
    url: `${API_URL}/api/authentication/session`,
    withCredentials: true,
  });
  if (response.status === 200) {
    return response.data.session && response.data.session === true;
  }
  return false;
};
