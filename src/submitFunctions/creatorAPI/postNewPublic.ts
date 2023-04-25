import axios from "axios";
import { creatorUrl } from "../../config/config";
import { TOKEN } from "../../config/types";
import { Cookies } from "react-cookie";
import { INewPublic } from "../../models/calendarModels/INewPublic";

let cookie = new Cookies();

export const postNewPublic = async (
  data: INewPublic,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    return;
  }
  try {
    let response = await axios.post(creatorUrl + "/public", data, {
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
