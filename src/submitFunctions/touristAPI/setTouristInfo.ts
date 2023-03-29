import axios from "axios";
import { touristUrl } from "../../config/config";
import { TOKEN } from "../../config/types";
import { Cookies } from "react-cookie";
import { ITouristInfo } from "../../models/userModels/IUserInfo";

let cookie = new Cookies();

export const setTouristInfo = async (
  data: ITouristInfo,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    return;
  }
  try {
    let respone = await axios.post(touristUrl + "/touristInfo", {
      data: data,
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
