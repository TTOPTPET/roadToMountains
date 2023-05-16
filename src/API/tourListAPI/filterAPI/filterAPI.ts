import axios from "axios";
import { urlTour } from "../../../config/config";
import { IFilter } from "../../../models/tourListModels/IFilter";

const filterDefault: IFilter = {
  regions: [
    "Алтайский край",
    "Владимирская область",
    "Москва",
    "Орехово-Зуево",
  ],
  category: ["Кемпиг", "Падик", "Экскурсия", "Конченные прогулки"],
  complexity: ["1", "2", "3", "4", "5"],
  maxPrice: 100000,
};

export const getFilters = async (
  successCallback: (prop: IFilter) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(filterDefault);
    return;
  }
  try {
    let response = await axios.get(urlTour + "/filters");
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
