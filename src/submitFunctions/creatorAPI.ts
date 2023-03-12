import { creatorUrl } from "../config/config";
import { Cookies } from "react-cookie";
import axios from "axios";
import { TOKEN } from "../config/types";
import { IMyTour } from "../models/creatorModels/IMyTour";

let cookie = new Cookies();

const defaultResponse : IMyTour[] = [
  {
    tourId: "12",
    tourName: "Что-то на европейском",
    category: "aaa",
    complexity: "aaa",
    price: {
      from: 10000,
      to: 15000,
    },
    region: "aaa",
    tourDate: {
      from: "aaa",
      to: "aaa",
    },
    personsNumber: 2,
    photo: ["../media/cardbg.png"],
    banStatus: true,
    publicNum: 0,
  },
  {
    tourId: "13",
    tourName: "Что-то еще",
    category: "aaa",
    complexity: "aaa",
    price: {
      from: 500,
      to: 15000,
    },
    region: "aaa",
    tourDate: {
      from: "aaa",
      to: "aaa",
    },
    personsNumber: 2,
    photo: [],
    banStatus: false,
    publicNum: 11,
  },
  {
    tourId: "14",
    tourName: "Самый дорогой тур",
    category: "aaa",
    complexity: "aaa",
    price: {
      from: 5312312300,
      to: 15000,
    },
    region: "aaa",
    tourDate: {
      from: "aaa",
      to: "aaa",
    },
    personsNumber: 2,
    photo: [],
    banStatus: true,
    publicNum: 54,
  },
];

export const getMyTours = async (
  successCallback: (prop: IMyTour[]) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(defaultResponse.length > 0 ? defaultResponse : null);
    return;
  }
  try {
    let response = await axios.get(creatorUrl + "/myTours ", {
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
