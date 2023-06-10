import axios from "axios";
import { creatorUrl } from "../../config/config";
import {
  IStatistic,
  TourStatus,
} from "../../models/statisticModels/IStatistic";
import { IStatisticSearch } from "../../models/statisticModels/IStatisticSearch";

const defaultStatistic: IStatistic[] = [
  {
    tourStatus: TourStatus.published,
    personNum: 10,
    tourAmount: 1500,
    tourName: "Что-то",
    stats: [
      {
        units: "%",
        name: "Пол",
        lables: ["Мужской", "Женский", "Другой"],
        data: [23, 2, 70],
      },
      {
        units: "%",
        name: "Возраст",
        lables: ["0-17", "18-25", "26-50", "51-70"],
        data: [13, 30, 40, 20],
      },
    ],
  },
  {
    tourStatus: TourStatus.nonPublished,
    personNum: 20,
    tourAmount: 10500,
    tourName: "Пирамиды",
    stats: [
      {
        units: "%",
        name: "Пол",
        lables: ["Мужской", "Женский", "Другой"],
        data: [23, 2, 70],
      },
      {
        units: "%",
        name: "Возраст",
        lables: ["0-17", "18-25", "26-50", "51-70"],
        data: [13, 30, 40, 20],
      },
      {
        units: "%",
        name: "Адекватность",
        lables: ["0-17", "18-25", "26-50", "51-70"],
        data: [1, 10, 40, 50],
      },
    ],
  },
];

const getStatistic = async (
  params: IStatisticSearch,
  successCallback: (prop: IStatistic[]) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(defaultStatistic);
    return;
  }
  try {
    const response = await axios.get<IStatistic[]>(creatorUrl + "/statistic", {
      params: params,
    });

    successCallback(response.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export default getStatistic;
