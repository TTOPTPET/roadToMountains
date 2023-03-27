import axios from "axios";
import { creatorUrl } from "../../config/config";
import { TOKEN } from "../../config/types";
import { Cookies } from "react-cookie";
import { IUserInfo } from "../../models/userModels/IUserInfo";

let cookie = new Cookies();

const setCreatorInfoDefault: IUserInfo = {};

export const setCreatorInfo = async (
  data: IUserInfo,
  successCallback: (prop: IUserInfo) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(setCreatorInfoDefault);
    return;
  }
  try {
    let respone = await axios.post(creatorUrl + "/creatorInfo", {
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
