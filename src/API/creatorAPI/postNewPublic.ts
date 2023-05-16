import axios from "axios";
import { creatorUrl } from "../../config/config";
import { INewPublic } from "../../models/calendarModels/INewPublic";

export const postNewPublic = async (
  data: INewPublic,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    return;
  }
  try {
    await axios.post(creatorUrl + "/public", data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
