import { creatorUrl } from "../../config/config";
import axios from "axios";

export const deletePostedTour = async (
  publicTourId: number,
  successCallback?: (params: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.delete(creatorUrl + "/public", {
      params: { publicTourId: publicTourId },
    });
    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
