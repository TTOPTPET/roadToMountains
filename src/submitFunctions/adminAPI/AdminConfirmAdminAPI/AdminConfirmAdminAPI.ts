import axios from "axios";
import { IAdminList } from "../../../models/adminModels/IAdminList";
import { adminUrl } from "../../../config/config";
import { TOKEN } from "../../../config/types";
import { Cookies } from "react-cookie";

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
