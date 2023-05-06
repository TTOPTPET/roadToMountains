import { creatorUrl } from "../../config/config";
import { TOKEN } from "../../config/types";
import { Cookies } from "react-cookie";
import axios from "axios";
import { IAddTour } from "../../models/addTourModels/IAddTour";

let cookie = new Cookies();

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
          Authorization: `Bearer ${cookie.get(TOKEN)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async () => {
        filesToDelete.forEach((file) => async () => {
          await axios.post(
            creatorUrl + `/tour/photo?pathPhoto=${file}&tourId=${tourId}`,
            {
              headers: {
                Authorization: `Bearer ${cookie.get(TOKEN)}`,
              },
            }
          );
        });
      });
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
