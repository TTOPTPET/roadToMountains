import axios from "axios";
import { urlTour } from "../../../config/config";
import { ISearchRequest } from "../../../models/tourListModels/ISearchRequest";
import { ITour } from "../../../models/tourCardModel/ITour";

const searchResponseDefault: ITour[] = [
  {
    category: "Падик",
    complexity: "1",
    cancelDeadline: "16.09.2023",
    publicTourId: "2",
    personsNumber: 50,
    prices: {
      from: 1500,
      to: 3500,
    },
    price: undefined,
    region: "Орехово-Зуево",
    tourDate: {
      from: "16.09.2023",
      to: "19.09.2023",
    },
    tourId: "d3818292-94d6-479f-a839-e2f78a730c28",
    tourName: "Падик адик",
    photos: [],
    banStatus: false,
    publicNum: 50,
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
    let response = await axios.post<ITour[]>(urlTour + "/search", data, {});
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
