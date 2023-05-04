import axios from "axios";
import { urlUser } from "../../../config/config";
import { Cookies } from "react-cookie";
import { IUserLogin } from "../../../models/authModels/IUserLogin";
import { IUserRegister } from "../../../models/authModels/IUserRegister";
import { IAuthResponse } from "../../../models/authModels/IAuthResponse";
import { REFRESH_TOKEN, TOKEN } from "../../../config/types";

let cookie = new Cookies();

const userAuthDefault: IAuthResponse = {
  accessToken: "TOKEN",
  refreshToken: "REFRESH",
};

export const confirmUserRegistration = async (
  data: { confirmationCode: number },
  successCallback?: (params: IAuthResponse) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post<IAuthResponse>(
      urlUser + "/confirmRegistration",
      data
    );
    cookie.set(TOKEN, response.data.accessToken);
    cookie.set(REFRESH_TOKEN, response.data.refreshToken);
    cookie.set("USER_ROLE", response.data.role);
    cookie.set("BAN_STATUS", response.data.status);
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const loginUser = async (
  data: IUserLogin,
  successCallback?: (prop: IAuthResponse) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(userAuthDefault);
    return;
  }
  try {
    let response = await axios.post<IAuthResponse>(urlUser + "/login", data);
    cookie.set(TOKEN, response.data.accessToken);
    cookie.set(REFRESH_TOKEN, response.data.refreshToken);
    cookie.set("USER_ROLE", response.data.role);
    cookie.set("BAN_STATUS", response.data.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const registerUser = async (
  successCallback: (prop: number) => void,
  data: IUserRegister,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  try {
    let response = await axios.post(urlUser + "/register", data);

    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const refreshToken = async () => {
  let response = await axios.get<IAuthResponse>(urlUser + "/refresh", {
    headers: {
      Authorization: `Bearer ${cookie.get(REFRESH_TOKEN)}`,
    },
  });
  // cookie.remove(TOKEN);
  cookie.set(TOKEN, response.data?.accessToken);
};
