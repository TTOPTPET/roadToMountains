import { apiKey, urlUser } from "../../config/config";
import { Cookies } from "react-cookie";
import axios from "axios";
import { TOKEN } from "../../config/types";

let cookie = new Cookies();

export const getUserInfo = async () => {
  const apiUrl = urlUser + `/users/info_users`;
  let response = await axios.get(apiUrl, {
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${cookie.get(TOKEN)}`,
    },
  });
  return response;
};
