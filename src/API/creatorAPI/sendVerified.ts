import axios from "axios";
import { creatorUrl } from "../../config/config";

export const sendVerified = async (
  successCallback: () => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback();
    return;
  }
  try {
    await axios.get(creatorUrl + "/sendVerified");
    successCallback();
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
