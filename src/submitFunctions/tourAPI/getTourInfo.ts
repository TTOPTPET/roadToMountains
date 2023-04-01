import axios from "axios";
import { urlTour } from "../../config/config";
import { TOKEN } from "../../config/types";
import { Cookies } from "react-cookie";
import { ITourInfo } from "../../models/tourModels/ITourInfo";

const cookie = new Cookies();

const responseDefault: ITourInfo = {};

export const getTourInfo = async (
  tourId: string,
  successCallback: (prop: ITourInfo) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(responseDefault);
    return;
  }
  try {
    let response = await axios.get<ITourInfo>(urlTour + `/tours/${tourId}`, {
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
    successCallback(response?.data as ITourInfo);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
