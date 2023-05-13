import axios from "axios";
import { creatorUrl } from "../../config/config";
import { TOKEN } from "../../config/types";
import { Cookies } from "react-cookie";

let cookie = new Cookies();

export const sendVerified = async (
  successCallback: () => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback();
    return;
  }
  try {
    let response = await axios.get(creatorUrl + "/sendVerified ", {
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
    successCallback();
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
