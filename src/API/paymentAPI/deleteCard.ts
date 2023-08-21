import { creatorUrl } from "../../config/config";
import axios from "axios";

export const deleteCard = async (
  successCallback: (prop?: any) => void,
  errorCallback?: (prop?: any) => void
) => {
  try {
    let response = await axios.delete(creatorUrl + "/finance/card");
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};
