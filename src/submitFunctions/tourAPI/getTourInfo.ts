import axios from "axios";
import { urlTour } from "../../config/config";
import { TOKEN } from "../../config/types";
import { Cookies } from "react-cookie";
import { ITourInfo } from "../../models/tourModels/ITourInfo";

const cookie = new Cookies();

const responseDefault: ITourInfo = {
  category: "Конченные уроды",
  complexity: "5",
  nearestDate: {
    from: "2023-04-10T16:00:00.000Z",
    to: "2023-04-11T16:00:00.000Z",
  },
  price: {
    from: 1000,
    to: 15000,
  },
  region: "Орехово-Зуево",
  tourName: "Пирамиды говна",
  tourDescription: "Говна наебни олух",
  recommendedAge: {
    from: 14,
    to: 30,
  },
  tourServices: {
    additionalServices: ["АБОБА", "уга буга"],
    freeServices: ["По ебалу", "Солевая альтуха"],
  },
  recommendations: ["Пиво", "Гандоны"],
  housingInclude: {
    housingAddress: "Иваново",
    housingName: "13",
    housingDescription: "В жопе мира",
  },
  insuranceInclude: {
    insuranceNumber: 100,
    insuranceAmount: 1041040104,
  },
};

export const getTourInfo = async (
  tourId: string,
  successCallback: (prop: ITourInfo) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(responseDefault);
    return;
  }
  try {
    let response = await axios.get<ITourInfo>(urlTour + `/tours/${tourId}`, {
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
    successCallback(response?.data as ITourInfo);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
