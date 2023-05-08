import { creatorUrl } from "../../config/config";
import { Cookies } from "react-cookie";
import { TOKEN } from "../../config/types";
import axios from "axios";

let cookie = new Cookies();

export const deleteCreatorFile = async (
  path: string,
  successCallback?: () => void,
  errorCallback?: () => void
) => {
  try {
    await axios.delete(creatorUrl + "/creatorDeleteDocuments", {
      data: {
        path: path,
      },
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
