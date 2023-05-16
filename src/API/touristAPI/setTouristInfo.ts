import axios from "axios";
import { touristUrl } from "../../config/config";
import { ITouristInfo } from "../../models/userModels/IUserInfo";

export const setTouristInfo = async (
  data: ITouristInfo,
  successCallback?: (prop: any) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    return;
  }
  try {
    let formData = new FormData();
    const dataUser = data.dataUser;
    delete data.dataUser;
    data = Object.assign(data, dataUser);
    formData.append("dataUser", JSON.stringify(data));
    let response = await axios.post(touristUrl + "/touristInfo", data);
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
