import axios from "axios";
import { creatorUrl } from "../../config/config";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";

export const editPublicTour = async (
  data: IPublicTour,
  successCallback?: () => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    return;
  }
  try {
    await axios.put(creatorUrl + "/public", data, {
      params: { tourId: data.tourId },
    });
    successCallback && successCallback();
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
