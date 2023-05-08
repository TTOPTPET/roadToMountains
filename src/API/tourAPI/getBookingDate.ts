import { urlTour } from "../../config/config";
import { Cookies } from "react-cookie";
import { TOKEN } from "../../config/types";
import axios from "axios";
import { ITourBookingDate } from "../../models/tourModels/ITourBookingDate";

let cookie = new Cookies();

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
          tourId: tourId,
        },
        headers: {
          Authorization: `Bearer ${cookie.get(TOKEN)}`,
        },
      }
    );
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
