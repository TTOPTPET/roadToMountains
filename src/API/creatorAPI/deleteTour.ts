import { creatorUrl } from "../../config/config";
import axios from "axios";

export const deleteTour = async (
  tourId: string,
  successCallback?: (params: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.delete(creatorUrl + `/tour?tourId=${tourId}`);
    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
