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
  delete data.photos;
  console.log(data);
  try {
    let response = await axios.put(creatorUrl + `/tour/${tourId}`, data, {
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
    if (response?.status === 200 || 201) {
      filesToDelete.forEach(async (image) => {
        await axios.delete(creatorUrl + "/tour/photo", {
          params: {
            pathPhoto: image,
            tourId: tourId,
          },
          headers: {
            Authorization: `Bearer ${cookie.get(TOKEN)}`,
          },
        });
      });
      const formData = new FormData();
      filesToUpload.forEach((file) => {
        formData.append("creatorPhoto", file);
      });
      await axios.post(creatorUrl + `/tour/photo/${tourId}`, formData, {
        headers: {
          Authorization: `Bearer ${cookie.get(TOKEN)}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
