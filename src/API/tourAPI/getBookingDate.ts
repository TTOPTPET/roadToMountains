import { urlTour } from "../../config/config";
import axios from "axios";
import { ITourBookingDate } from "../../models/tourModels/ITourBookingDate";

export const getBookingDate = async (
  tourId: string,
  successCallback?: (prop: ITourBookingDate[]) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get<ITourBookingDate[]>(
      urlTour + "/bookingsDate",
      {
        params: {
          tourId,
        },
      }
    );
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
