import { creatorUrl } from "../config/config";
import { Cookies } from "react-cookie";
import axios from "axios";
import { TOKEN } from "../config/types";
import { ITour } from "../models/tourCardModel/ITour";

let cookie = new Cookies();

const defaultResponse: ITour[] = [
  {
    tourId: "12",
    tourName: "Что-то на европейском",
    category: "Рафтинг",
    complexity: "aaa",
    price: {
      from: 10000,
      to: 15000,
    },
    region: "Алтайский край",
    tourDate: {
      from: "16.09.2023",
      to: "19.09.2023",
    },
    personsNumber: 2,
    photo: ["../media/cardbg.png"],
    banStatus: true,
    publicNum: 0,
  },
  {
    tourId: "13",
    tourName: "Что-то еще",
    category: "Экскурсия",
    complexity: "aaa",
    price: {
      from: 500,
      to: 15000,
    },
    region: "Московская область",
    tourDate: {
      from: "13.03.2023",
      to: "17.03.2023",
    },
    personsNumber: 2,
    photo: [],
    banStatus: false,
    publicNum: 11,
  },
  {
    tourId: "14",
    tourName: "Самый дорогой тур",
    category: "Джип-тур",
    complexity: "aaa",
    price: {
      from: 531211123312300,
      to: 15000,
    },
    region: "Владимирская область",
    tourDate: {
      from: "01.01.1985",
      to: "31.12.2023",
    },
    personsNumber: 2,
    photo: [],
    banStatus: true,
    publicNum: 54,
  },
];

export const getMyTours = async (
  successCallback: (prop: ITour[]) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(defaultResponse);
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
