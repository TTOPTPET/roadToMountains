import { touristUrl } from "../../config/config";
import axios from "axios";

export const bookingPay = async (
  bookingId: number,
  successCallback?: (prop: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(
      touristUrl + "/bookingPay",
      {},
      {
        params: { bookingId },
      }
    );
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
