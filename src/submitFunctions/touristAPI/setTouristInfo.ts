import axios from "axios";
import { touristUrl } from "../../config/config";
import { TOKEN } from "../../config/types";
import { Cookies } from "react-cookie";
import { IUserInfo } from "../../models/userModels/IUserInfo";

let cookie = new Cookies();

const setTouristInfoDefault: IUserInfo = {};

export const setTouristInfo = async (
  data: IUserInfo,
  successCallback: (prop: IUserInfo) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(setTouristInfoDefault);
    return;
  }
  try {
    let respone = await axios.post(touristUrl + "/touristInfo", {
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
