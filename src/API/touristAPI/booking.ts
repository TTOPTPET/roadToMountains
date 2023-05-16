import { touristUrl } from "../../config/config";
import axios from "axios";
import { ITourBooking } from "../../models/tourModels/ITourBooking";

export const booking = async (
  momentPay: boolean,
  data: ITourBooking,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(touristUrl + "/booking", data, {
      params: { momentPay },
    });
    return response.status;
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
