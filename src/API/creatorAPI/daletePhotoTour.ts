import { creatorUrl } from "../../config/config";
import axios from "axios";

export const deletePhotoTour = async (
  data: { tourId: string; fileUrl: string },
  successCallback?: () => void,
  errorCallback?: () => void
) => {
  try {
    await axios.post(
      creatorUrl + `/tour/photo?pathPhoto=${data.fileUrl}&tourId=${data.tourId}`
    );
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
