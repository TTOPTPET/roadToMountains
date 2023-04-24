import { touristUrl } from "../../config/config";
import { Cookies } from "react-cookie";
import { TOKEN } from "../../config/types";
import axios from "axios";
import { ITourBooking } from "../../models/tourModels/ITourBooking";

let cookie = new Cookies();

export const registrateTour = async (
  momentPay: boolean,
  data: ITourBooking,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(touristUrl + "booking", data, {
      params: { momentPay: momentPay },
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
    return response.status;
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
