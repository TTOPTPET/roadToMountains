import axios from "axios";
import { creatorUrl } from "../../config/config";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";

export const postNewPublic = async (
  data: IPublicTour,
  successCallback?: ({
    publicTourId,
    cancelDeadline,
    updateDeadline,
    tourAmountWithCommission,
  }: {
    publicTourId: string;
    cancelDeadline: string;
    updateDeadline: string;
    tourAmountWithCommission: number;
  }) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    return;
  }
  try {
    let response = await axios.post(creatorUrl + "/public", data);
    successCallback && successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
