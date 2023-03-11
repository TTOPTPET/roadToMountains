import axios from "axios";
import { IAdminList } from "../../../models/adminModels/IAdminList";
import { adminUrl } from "../../../config/config";
import { TOKEN } from "../../../config/types";
import { Cookies } from "react-cookie";
import { IRegister } from "../../../models/adminModels/IRegister";
import { ILogin } from "../../../models/adminModels/ILogin";

let cookie = new Cookies();

const adminListDefault: IAdminList[] = [
  {
    phone: "12414",
    email: "s",
    password: "1515135",
    name: "amogus USA",
    banStatus: false,
  },
];

export const getAdminList = async (
  successCallback: (prop: IAdminList[]) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(adminListDefault);
    return;
  }
  try {
    let response = await axios.get(adminUrl + "/adminList ", {
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

const adminRegisterDefault: IRegister = {
  phone: "15155",
  email: "aaaa",
  password: "1414114124",
  name: "BEBRA",
};

export const registerAdmin = async (
  successCallback: (prop: IRegister) => void,
  params: IRegister,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(adminRegisterDefault);
    return;
  }
  try {
    let respone = await axios.post(adminUrl + "/register", params, {
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

const adminLoginDefault: ILogin = {
  phone: "15155",
  email: "aaaa",
  password: "1414114124",
};

export const loginAdmin = async (
  successCallback: (prop: ILogin) => void,
  params: ILogin,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(adminLoginDefault);
    return;
  }
  try {
    let response = await axios.post(adminUrl + "/login", params, {
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
