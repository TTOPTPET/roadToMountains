import axios from "axios";
import { urlUser } from "../../../config/config";
import { TOKEN } from "../../../config/types";
import { Cookies } from "react-cookie";
import { ISearchRequest } from "../../../models/tourListModels/ISearchRequest";
import { ITour } from "../../../models/tourCardModel/ITour";

const cookie = new Cookies();

const searchResponseDefault: ITour[] = [
  {
    category: "Падик",
    complexity: "1",
    personsNumber: 50,
    price: {
      from: 1500,
      to: 3500,
    },
    region: "Орехово-Зуево",
    tourDate: {
      from: "16.09.2023",
      to: "19.09.2023",
    },
    tourId: "52c1fcfe-611b-4de1-b6f4-9a214a9e88c4",
    tourName: "Падик адик",
    photos: [],
    banStatus: false,
    publicNum: 50,
  },
  {
    category: "Экскурсия",
    complexity: "3",
    personsNumber: 20,
    price: {
      from: 5500,
      to: 15000,
    },
    region: "Алтайский край",
    tourDate: {
      from: "16.08.2023",
      to: "19.09.2023",
    },
    tourId: "1414rpefkeq-3r012k12-l1g1g1",
    tourName: "Алтай адик",
    photos: [],
    banStatus: false,
    publicNum: 5,
  },
  {
    category: "Конченные прогулки",
    complexity: "5",
    personsNumber: 10,
    price: {
      from: 25000,
      to: 35000,
    },
    region: "Орехово-Зуево",
    tourDate: {
      from: "25.10.2023",
      to: "30.10.2023",
    },
    tourId: "1414rpeakeq-3r012k12-g1g1g1",
    tourName: "Вокзал Курская",
    photos: [],
    banStatus: false,
    publicNum: 15,
  },
  {
    category: "Кемпинг",
    complexity: "2",
    personsNumber: 30,
    price: {
      from: 5500,
    },
    region: "Орехово-Зуево",
    tourDate: {
      from: "1.09.2023",
      to: "9.09.2023",
    },
    tourId: "1414rpehkeq-3r012k12-g1g1g1",
    tourName: "Дыкдыкдык",
    photos: [],
    banStatus: false,
    publicNum: 500,
  },
  {
    category: "Конченные прогулки",
    complexity: "4",
    personsNumber: 6,
    price: {
      from: 15000,
    },
    region: "Владимирская область",
    tourDate: {
      from: "16.07.2023",
      to: "19.07.2023",
    },
    tourId: "1414rpefkeq-3r112k12-g1g1g1",
    tourName: "Владик",
    photos: [],
    banStatus: false,
    publicNum: 3,
  },
  {
    category: "Падик",
    complexity: "2",
    personsNumber: 100,
    price: {
      from: 500,
    },
    region: "Алтайский край",
    tourDate: {
      from: "6.09.2023",
      to: "27.09.2023",
    },
    tourId: "1424rpefkeq-3r012k12-g1g1g1",
    tourName: "Алтай падиковый",
    photos: [],
    banStatus: false,
    publicNum: 34,
  },
];

export const getToursSorted = async (
  successCallback: (prop: ITour[]) => void,
  data: ISearchRequest,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(searchResponseDefault);
    return;
  }
  try {
    let response = await axios.get<ITour[]>(urlUser + "/tours/search", {
      data: data,
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
