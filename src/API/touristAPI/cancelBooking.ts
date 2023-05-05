import { touristUrl } from "../../config/config";
import axios from "axios";
import { Cookies } from "react-cookie";
import { TOKEN } from "../../config/types";

let cookie = new Cookies();

export const cancelBooking = async (
  bookingId: number,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get(touristUrl + "/bookingCancel", {
      params: { bookingId: bookingId },
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
