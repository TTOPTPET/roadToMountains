import { touristUrl } from "../../config/config";
import axios from "axios";
import { ITourBooking } from "../../models/tourModels/ITourBooking";

export const booking = async (
  momentPay: boolean,
  data: ITourBooking,
  successCallback?: (prop: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(touristUrl + "/booking", data, {
      params: { momentPay },
    });
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
