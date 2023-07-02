import { creatorUrl } from "../../config/config";
import axios from "axios";

export const deleteCard = async (errorCallback?: () => void) => {
  try {
    await axios.delete(creatorUrl + "/finance/card");
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
