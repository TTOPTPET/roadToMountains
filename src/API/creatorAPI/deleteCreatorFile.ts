import { creatorUrl } from "../../config/config";
import axios from "axios";

export const deleteCreatorFile = async (
  path: string,
  successCallback?: () => void,
  errorCallback?: () => void
) => {
  try {
    await axios.delete(creatorUrl + "/creatorDeleteDocuments", {
      data: {
        path,
      },
    });
    successCallback();
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
