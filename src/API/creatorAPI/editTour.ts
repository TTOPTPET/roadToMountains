import { creatorUrl } from "../../config/config";
import axios from "axios";
import { IAddTour } from "../../models/addTourModels/IAddTour";

export const editTour = async (
  tourId: string,
  data: IAddTour,
  filesToUpload: any[],
  successCallback?: () => void,
  errorCallback?: () => void
) => {
  //delete data.photos;
  console.log(data);
  let formData = new FormData();
  formData.append("data", JSON.stringify(data));
  filesToUpload.forEach((photo) => {
    formData.append("creatorPhoto", photo);
  });
  try {
    await axios.put(creatorUrl + "/tour", formData, {
      params: {
        tourId: tourId,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    successCallback && successCallback();
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
