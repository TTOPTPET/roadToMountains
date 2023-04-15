import axios from "axios";
import { creatorUrl } from "../../config/config";
import { TOKEN } from "../../config/types";
import { Cookies } from "react-cookie";
import { ICreatorInfo } from "../../models/userModels/IUserInfo";

let cookie = new Cookies();

export const setCreatorInfo = async (
  data: ICreatorInfo,
  successCallback?: (prop: any) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    return;
  }
  try {
    let formData = new FormData();
    formData.append("dataUser", JSON.stringify(data));
    let response = await axios.post(creatorUrl + "/creatorInfo", formData, {
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
        "Content-Type": "multipart/form-data",
      },
    });
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
