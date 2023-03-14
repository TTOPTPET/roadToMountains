import axios from "axios";
import { urlUser } from "../../../config/config";
import { TOKEN } from "../../../config/types";
import { Cookies } from "react-cookie";
import { IUserLogin } from "../../../models/authModels/IUserLogin";
import { IUserRegister } from "../../../models/authModels/IUserRegister";
import { IConfirmRegistration } from "../../../models/authModels/IConfirmRegistration";

let cookie = new Cookies();

const userLoginDefault: IUserLogin = {
  email: "str",
  password: "str",
  phone: "str",
};

export const loginUser = async (
  successCallback: (prop: IUserLogin) => void,
  params: string,
  data: IUserLogin,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(userLoginDefault);
    return;
  }
  try {
    let respone = await axios.post(urlUser + "/login", {
      params: params,
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

const userRegisterDefault: IUserRegister = {
  email: "creaper@minecraft.su",
  name: "sosika",
  password: "12345",
  phone: "8999999999",
  typeUser: "tourist",
};

export const registerUser = async (
  successCallback: (prop: IUserRegister) => void,
  data: IUserLogin,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(userRegisterDefault);
    return;
  }
  try {
    let respone = await axios.post(urlUser + "/register", {
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
