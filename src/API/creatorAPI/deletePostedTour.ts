import { creatorUrl } from "../../config/config";
import { Cookies } from "react-cookie";
import { TOKEN } from "../../config/types";
import axios from "axios";

let cookie = new Cookies();

export const deletePostedTour = async (
  publicTourId: number,
  successCallback?: (params: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get(creatorUrl + "/public", {
      params: { publicTourId: publicTourId },
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
