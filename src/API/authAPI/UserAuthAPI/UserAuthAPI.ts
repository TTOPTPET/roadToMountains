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
  successCallback?: (prop: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post<IAuthResponse>(
      urlUser + "/confirmRegistration",
      data
    );

    successCallback && successCallback(response.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const loginUser = async (
  data: IUserLogin,
  successCallback?: (prop: IAuthResponse) => void,
  errorCallback?: (prop: any) => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(userAuthDefault);
    return;
  }
  try {
    let response = await axios.post<IAuthResponse>(urlUser + "/login", data);

    successCallback && successCallback(response.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};

export const registerUser = async (
  successCallback: (prop: number) => void,
  data: IUserRegister,
  errorCallback?: (prop: any) => void,
  useDefault?: boolean
) => {
  delete data.passwordSecond;

  try {
    let response = await axios.post(urlUser + "/register", data);

    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
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
