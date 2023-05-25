import axios from "axios";
import { creatorUrl } from "../../config/config";
import { ICreatorInfo } from "../../models/userModels/IUserInfo";
import imageCompression from "browser-image-compression";
import * as _ from "lodash";

export const setCreatorInfo = async (
  data: ICreatorInfo,
  successCallback?: (prop: any) => void,
  editedCallback?: (prop: any) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  console.log("setCreatorInfo", data);
  if (useDefault) {
    return;
  }
  try {
    let formData = new FormData();
    let copyDataUser = _.cloneDeep(data);
    copyDataUser?.dataUser?.documents?.forEach((doc) => {
      doc.file && formData.append("creatorDocuments", doc.file);
    });
    let resizedFile: File;
    if (copyDataUser?.photo instanceof File) {
      resizedFile = await imageCompression(copyDataUser?.photo as File, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      });
    }

    resizedFile && formData.append("photo", resizedFile);
    //Перемещение dataUser в корень
    const dataUser = copyDataUser?.dataUser;
    delete copyDataUser?.dataUser;
    delete copyDataUser?.photo;
    copyDataUser = Object.assign(copyDataUser, dataUser);
    //
    formData.append("dataUser", JSON.stringify(copyDataUser));

    let response = await axios.post(creatorUrl + "/creatorInfo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    successCallback(response?.data);
  } catch (e: any) {
    if (e?.response?.status === 300) {
      editedCallback && editedCallback(e.response?.data);
    }
    console.error(e);
    errorCallback && errorCallback();
  }
};
