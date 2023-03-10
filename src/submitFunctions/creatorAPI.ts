import { creatorUrl } from "../config/config";
import { Cookies } from "react-cookie";
import axios from "axios";
import { TOKEN } from "../config/types";
import { IMyTours } from "../pages/CreatorLk/CreatorLk";
import photo from "../media/cardbg.png";

let cookie = new Cookies();

const defaultResponse = [
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
    publicNum: 5,
  },
];

export const getMyTours = async (
  successCallback: (prop: IMyTours[]) => void,
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
