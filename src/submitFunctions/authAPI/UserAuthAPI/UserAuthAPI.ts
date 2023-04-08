import axios from "axios";
import { urlUser } from "../../../config/config";
import { TOKEN } from "../../../config/types";
import { Cookies } from "react-cookie";
import { IUserLogin } from "../../../models/authModels/IUserLogin";
import { IUserRegister } from "../../../models/authModels/IUserRegister";
import { IConfirmRegistration } from "../../../models/authModels/IConfirmRegistration";
import { IAuthResponse } from "../../../models/authModels/IAuthResponse";

let cookie = new Cookies();

const userAuthDefault: IAuthResponse = {
  accessTocken: "TOKEN",
  refreshTocken: "REFRESH",
};

export const loginUser = async (
  successCallback: (prop: IAuthResponse) => void,
  params: string,
  data: IUserLogin,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(userAuthDefault);
    return;
  }
  try {
    let response = await axios.post<IAuthResponse>(urlUser + "/login", {
      params: params,
      data: data,
    });
    cookie.set("ACCESS_TOKEN", response.data.accessTocken);
    cookie.set("REFRESH_TOKEN", response.data.refreshTocken);
    cookie.set("USER_INFO", response.data.userInfo);
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const registerUser = async (
  successCallback: (prop: IAuthResponse) => void,
  data: IUserLogin,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(userAuthDefault);
    return;
  }
  try {
    let response = await axios.post(urlUser + "/register", {
      data: data,
    });
    cookie.set("ACCESS_TOKEN", response.data.accessTocken);
    cookie.set("REFRESH_TOKEN", response.data.refreshTocken);
    cookie.set("USER_INFO", response.data.userInfo);
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

const confirmCodeDefault: IConfirmRegistration = {
  accessTocken: "aaaa",
  refreshTocken: "afafa",
};

export const confirmUserRegistration = async (
  successCallback: (prop: IConfirmRegistration) => void,
  data: string,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(confirmCodeDefault);
    return;
  }
  try {
    let respone = await axios.post(urlUser + "/confirmRegistration", {
      data: data,
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
    successCallback(respone?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
