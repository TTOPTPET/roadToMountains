import axios from "axios";
import { creatorUrl } from "../../config/config";
import { TOKEN } from "../../config/types";
import { Cookies } from "react-cookie";
import { IAddTour } from "../../models/addTourModels/IAddTour";
import { ITourInfo } from "../../models/tourModels/ITourInfo";

let cookie = new Cookies();

const addTourDefault: IAddTour = {};

export const addTour = async (
  successCallback: (prop: IAddTour) => void,
  data: IAddTour,
  files: any[],
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(addTourDefault);
    return;
  }
  try {
    let formData = new FormData();
    formData.append("data", JSON.stringify(data));
    files.forEach((file) => {
      formData.append("creatorPhoto", file);
    });
    console.log(JSON.stringify(formData));
    let respone = await axios.post(creatorUrl + "/tour", formData, {
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
        "Content-Type": "multipart/form-data",
      },
    });
    successCallback(respone?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
