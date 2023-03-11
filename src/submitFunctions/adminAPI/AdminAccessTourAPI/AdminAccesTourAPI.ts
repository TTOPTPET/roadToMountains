import axios from "axios";
import { adminUrl } from "../../../config/config";
import { TOKEN } from "../../../config/types";
import { Cookies } from "react-cookie";
import { ITourList } from "../../../models/adminModels/ITourList";

let cookie = new Cookies();

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
    let response = await axios.get(adminUrl + "/tourList ", {
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
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
    let respone = await axios.put(adminUrl + "/tourBan/" + params, {
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
    successCallback(respone?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
