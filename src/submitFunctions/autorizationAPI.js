import { apiKey, urlUser } from "../../config/config";
import { Cookies } from "react-cookie";
import axios from "axios";
import { TOKEN } from "../../config/types";

let cookie = new Cookies();

export const login = async (userData, regState) => {
  const apiUrl = urlUser + `/users/${regState ? "register" : "login"}`;
  const data = regState
    ? {
        name: userData?.userName,
        login: userData?.login,
        password: userData?.password,
      }
    : {
        login: userData?.login,
        password: userData?.password,
      };
  let response = await axios.post(apiUrl, data, {
    headers: {
      "X-API-KEY": apiKey,
    },
  });
  return response;
};

export const logout = () => {
  const apiUrl = urlUser + `/users/logout`;
  // let cookie = getCookie();
  let response = axios.delete(apiUrl, {
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${cookie.get(TOKEN)}`,
    },
  });
  return response;
};
