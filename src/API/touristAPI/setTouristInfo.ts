import axios from "axios";
import { touristUrl } from "../../config/config";
import { ITouristInfo } from "../../models/userModels/IUserInfo";
import cloneDeep from "lodash/cloneDeep";

export const setTouristInfo = async (
  data: ITouristInfo,
  successCallback?: (prop: any) => void,
  editedCallback?: (prop: any) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    return;
  }
  try {
    let copyData = cloneDeep(data);
    let formData = new FormData();
    const dataUser = copyData.dataUser;
    delete copyData.dataUser;
    copyData = Object.assign(copyData, dataUser);
    formData.append("dataUser", JSON.stringify(copyData));
    let response = await axios.post(touristUrl + "/touristInfo", copyData);
    successCallback(response?.data);
  } catch (e: any) {
    if (e?.response?.status === 300) {
      editedCallback && editedCallback(e.response?.data);
    }
    console.error(e);
    errorCallback && errorCallback();
  }
};
