import axios from "axios";
import { creatorUrl } from "../../config/config";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";

export const editPublicTour = async (
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
    let response = await axios.put(creatorUrl + "/public", data, {
      params: { publicTourId: data.publicTourId },
    });
    successCallback && successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
