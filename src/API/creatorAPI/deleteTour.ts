import { creatorUrl } from "../../config/config";
import { Cookies } from "react-cookie";
import { TOKEN } from "../../config/types";
import axios from "axios";

let cookie = new Cookies();

export const deleteTour = async (
  tourId: string,
  successCallback?: (params: any) => void,
  editedCallback?: (prop: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.delete(creatorUrl + `/tour?tourId=${tourId}`, {
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
    successCallback(response?.status);
  } catch (e: any) {
    if (e?.response?.status === 300) {
      editedCallback && editedCallback(e.response?.data);
    }
    console.error(e);
    errorCallback && errorCallback();
  }
};
