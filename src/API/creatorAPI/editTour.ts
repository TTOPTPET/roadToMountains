import { creatorUrl } from "../../config/config";
import axios from "axios";
import { IAddTour } from "../../models/addTourModels/IAddTour";

export const editTour = async (
  tourId: string,
  data: IAddTour,
  filesToUpload: any[],
  filesToDelete: string[],
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
    let response = await axios
      .put(creatorUrl + "/tour", formData, {
        params: {
          tourId: tourId,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async () => {
        filesToDelete.forEach((file) => async () => {
          await axios.post(
            creatorUrl + `/tour/photo?pathPhoto=${file}&tourId=${tourId}`
          );
        });
      });
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
