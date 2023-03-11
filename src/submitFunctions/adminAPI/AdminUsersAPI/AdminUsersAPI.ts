import axios from "axios";
import { adminUrl } from "../../../config/config";
import { TOKEN } from "../../../config/types";
import { Cookies } from "react-cookie";

let cookie = new Cookies();

const userBanDefault: string = "1";

export const userBan = async (
  successCallback: (prop: string) => void,
  params: string,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(userBanDefault);
    return;
  }
  try {
    let response = await axios.put(adminUrl + "/usersBan/" + params, {
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
