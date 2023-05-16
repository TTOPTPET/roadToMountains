import axios from "axios";
import { ITouristList } from "../../../models/adminModels/ITouristList";
import { adminUrl } from "../../../config/config";

const touristDefault: ITouristList[] = [
  {
    touristId: "1",
    name: "Amogus",
    phone: "112412424",
    email: "ddd@gmg",
    banStatus: false,
  },
  {
    touristId: "2",
    name: "Abobus",
    phone: "112412424",
    email: "ddd@gmg",
    banStatus: false,
  },
];

export const getTouristList = async (
  successCallback: (prop: ITouristList[]) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(touristDefault);
    return;
  }
  try {
    let response = await axios.get(adminUrl + "/touristList ");
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
