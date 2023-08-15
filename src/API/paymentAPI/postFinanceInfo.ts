import { creatorUrl } from "../../config/config";
import axios from "axios";
import { CreatorType } from "../../models/userModels/IUserInfo";

interface IFinanceInfo {
  bik?: string;
  accountNumber?: string;
}

export const postFinanceInfo = async (
  creatorType: CreatorType,
  data?: IFinanceInfo,
  successCallback?: (prop: any) => void,
  errorCallback?: (prop: any) => void
) => {
  try {
    let response = await axios.post(creatorUrl + "/finance", data, {});
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};
