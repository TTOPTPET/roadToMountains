import axios from "axios";
import { creatorUrl } from "../../config/config";
import { IAddTour } from "../../models/addTourModels/IAddTour";
import { cloneDeep } from "lodash";

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
    console.log("addTour", data);
    let formData = new FormData();
    const dataWihoutPhotos = cloneDeep(data);
    if ("photos" in dataWihoutPhotos) {
      delete dataWihoutPhotos.photos;
    }
    formData.append("data", JSON.stringify(dataWihoutPhotos));
    data.photos.forEach((file) => {
      if (typeof file !== "string") {
        formData.append("tourPhoto", file);
      }
    });
    let respone = await axios.post(creatorUrl + "/tour", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    successCallback(respone?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
