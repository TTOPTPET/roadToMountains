import axios from "axios";
import { urlUser } from "../../../config/config";
import { Cookies } from "react-cookie";
import { IUserLogin } from "../../../models/authModels/IUserLogin";
import { IUserRegister } from "../../../models/authModels/IUserRegister";
import { IConfirmRegistration } from "../../../models/authModels/IConfirmRegistration";
import { IAuthResponse } from "../../../models/authModels/IAuthResponse";

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
    cookie.set("ACCESS_TOKEN", response.data.accessToken);
    cookie.set("REFRESH_TOKEN", response.data.refreshToken);
    cookie.set("USER_ROLE", response.data.role);
    cookie.set("BAN_STATUS", response.data.status);
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const loginUser = async (
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
    let response = await axios.post<IAuthResponse>(urlUser + "/login", data);
    cookie.set("ACCESS_TOKEN", response.data.accessToken);
    cookie.set("REFRESH_TOKEN", response.data.refreshToken);
    cookie.set("USER_ROLE", response.data.role);
    cookie.set("BAN_STATUS", response.data.status);
    successCallback(response?.data);
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
