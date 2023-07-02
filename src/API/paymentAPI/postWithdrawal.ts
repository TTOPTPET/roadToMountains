import { creatorUrl } from "../../config/config";
import axios from "axios";

export const postWithdrawal = async (
  amount: string,
  successCallback?: (prop: number) => void,
  errorCallback?: (prop: any) => void
) => {
  try {
    let response = await axios.post(creatorUrl + "/finance/withdrawal", amount);
    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};
