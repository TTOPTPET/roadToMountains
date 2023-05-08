import axios from "axios";
import { creatorUrl } from "../../config/config";
import { TOKEN } from "../../config/types";
import { Cookies } from "react-cookie";
import { ICreatorInfo } from "../../models/userModels/IUserInfo";
import * as _ from "lodash";

let cookie = new Cookies();

export const setCreatorInfo = async (
  data: ICreatorInfo,
  successCallback?: (prop: any) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  console.log("setCreatorInfo", data);
  if (useDefault) {
    return;
  }
  try {
    console.log(data);
    let formData = new FormData();
    let copyDataUser = _.cloneDeep(data);
    copyDataUser.dataUser.documents.forEach((doc) => {
      doc.file && formData.append("creatorDocuments", doc.file);
    });
    //Перемещение dataUser в корень
    const dataUser = copyDataUser.dataUser;
    delete copyDataUser.dataUser;
    copyDataUser = Object.assign(copyDataUser, dataUser);
    //
    formData.append("dataUser", JSON.stringify(copyDataUser));

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
