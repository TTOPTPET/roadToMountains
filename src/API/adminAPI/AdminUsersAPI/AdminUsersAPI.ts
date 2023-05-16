import axios from "axios";
import { adminUrl } from "../../../config/config";

const userBanDefault: string = "1";

export const userBan = async (
  successCallback: (prop: string) => void,
  params: string,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(userBanDefault);
    return;
  }
  try {
    let response = await axios.get(adminUrl + "/usersBan", {
      params: { userId: params },
    });
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
