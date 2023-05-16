import axios from "axios";
import { IAdminList } from "../../../models/adminModels/IAdminList";
import { adminUrl } from "../../../config/config";
import { TOKEN } from "../../../config/types";

import { IAdminRegister } from "../../../models/adminModels/IAdminRegister";
import { IAdminLogin } from "../../../models/adminModels/IAdminLogin";

const adminListDefault: IAdminList[] = [
  {
    adminId: "ewjfkwqhgwewk;g",
    phone: "12414",
    email: "s",
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
    let response = await axios.get(adminUrl + "/adminList ");
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

const adminRegisterDefault: IAdminRegister = {
  phone: "15155",
  email: "aaaa",
  password: "1414114124",
  name: "BEBRA",
};

export const registerAdmin = async (
  successCallback: (prop: IAdminRegister) => void,
  data: IAdminRegister,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(adminRegisterDefault);
    return;
  }
  try {
    let respone = await axios.post(adminUrl + "/register", data);
    successCallback(respone?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

const adminLoginDefault: IAdminLogin = {
  phone: "15155",
  email: "aaaa",
  password: "1414114124",
};

export const loginAdmin = async (
  successCallback: (prop: IAdminLogin) => void,
  data: IAdminLogin,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(adminLoginDefault);
    return;
  }
  try {
    let response = await axios.post(adminUrl + "/login", data);
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
