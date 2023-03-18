import axios from "axios";
import { creatorUrl } from "../../config/config";
import { TOKEN } from "../../config/types";
import { Cookies } from "react-cookie";
import { IAddTour } from "../../models/addTourModels/IAddTour";

let cookie = new Cookies();

const addTourDefault: IAddTour = {};

export const addTour = async (
  successCallback: (prop: IAddTour) => void,
  data: IAddTour,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(addTourDefault);
    return;
  }
  try {
    let respone = await axios.post(creatorUrl + "/tour", {
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
