import axios from "axios";
import { adminUrl } from "../../../config/config";
import { TOKEN } from "../../../config/types";
import { ITourList } from "../../../models/adminModels/ITourList";

const tourDefault: ITourList[] = [
  {
    tourId: "1",
    tourName: "gg",
    creatorInfo: {
      creatorId: "1",
      name: "amogus",
      phone: "141414",
      email: "gg_pominki@tagi.com",
    },
    banStatus: false,
  },
];

export const getTourList = async (
  successCallback: (prop: ITourList[]) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(tourDefault);
    return;
  }
  try {
    let response = await axios.get(adminUrl + "/tourList ");
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

const tourBanDefault: string = "1";

export const tourBan = async (
  successCallback: (prop: string) => void,
  params: string,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(tourBanDefault);
    return;
  }
  try {
    let respone = await axios.get(adminUrl + "/tourBan", {
      params: {
        tourId: params,
      },
    });
    successCallback(respone?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
