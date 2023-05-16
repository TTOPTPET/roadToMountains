import { touristUrl } from "../../config/config";
import axios from "axios";

export const cancelBooking = async (
  bookingId: number,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.get(touristUrl + "/bookingCancel", {
      params: { bookingId },
    });
    return response.status;
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
