import { adminUrl } from "../config/config";
import { Cookies } from "react-cookie";
import axios from "axios";
import { TOKEN } from "../config/types";
import { ITouristList } from "../models/adminModels/ITouristList";
import { ITourList } from "../models/adminModels/ITourList";

let cookie = new Cookies();

export const tourBan = async (
  params?: any,
  successCallback?: (prop: any) => void,
  errorCallback?: () => void
) => {
  interface Iinterface {
    tourId: string;
    tourName: string;
    category: string;
    complexity: string;
    price: {
      from: number;
      to: number;
    };
    region: string;
    tourDate: {
      from: string;
      to: string;
    };
    personsNumber: number;
  }

  await axios
    .get(adminUrl + "/tourBan", {
      params: params,
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    })
    .then(
      (value) => {
        try {
          let retr: [Iinterface] = value?.data;
          successCallback && successCallback(retr);
        } catch (e) {
          console.error(e);
          errorCallback && errorCallback();
        }
      },
      (reason) => {
        console.error(reason);
        errorCallback && errorCallback();
      }
    );
};

const touristDefault : ITouristList[] = [
  {
  touristId: "1",
  name: "Amogus",
  phone: "112412424",
  email: "ddd@gmg",
  banStatus: false
  },
  {
    touristId: "2",
    name: "Abobus",
    phone: "112412424",
    email: "ddd@gmg",
    banStatus: false
  }
]

export const getTouristList = async(
  successCallback: (prop: ITouristList[]) => void,
  errorCallback?: () => void,
  useDefault?: boolean
  ) => {
  if (useDefault) {
    successCallback(touristDefault);
    return;
  }
  try {
    let response = await axios.get(adminUrl + "/touristList ", {
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
}

const tourDefault : ITourList[] = [
  {
    tourId: "1",
    tourName: "gg",
    creatorInfo: {
      creatorId: "1",
      name: "amogus",
      phone: "141414",
      email: "gg_pominki@tagi.com"
    },
    banStatus: "net"
  }
]

export const getTourList = async(
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
}
