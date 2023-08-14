import { creatorUrl } from "../../config/config";
import axios from "axios";

interface IWithdrawal {
  amount?: number;
}

export const postWithdrawal = async (
  data: IWithdrawal,
  successCallback?: (prop: number) => void,
  errorCallback?: (prop: any) => void
) => {
  try {
    let response = await axios.post(creatorUrl + "/finance/withdrawal", data);
    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};
