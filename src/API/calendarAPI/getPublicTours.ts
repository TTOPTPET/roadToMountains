import { creatorUrl } from "../../config/config";
import { Cookies } from "react-cookie";
import axios from "axios";
import { TOKEN } from "../../config/types";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";

let cookie = new Cookies();

const publicTourDefault: IPublicTour[] = [
  {
    bookingId: 123,
    bookingInfo: [
      {
        bookingDate: {
          from: "2023-04-04T16:00:00.000Z",
          to: "2023-04-14T16:00:00.000Z",
        },
        bookingId: "13414",
        comment: "sfqf",
        tourAmount: 1500,
        touristsInfo: [
          {
            age: "25",
            name: "Serega",
            sex: "Doter",
          },
        ],
        userInfo: {
          email: "",
          name: "Бебра",
          phone: "88135105",
        },
      },
      {
        bookingDate: {
          from: "2023-05-04T16:00:00.000Z",
          to: "2023-05-14T16:00:00.000Z",
        },
        bookingId: "14143",
        comment: "sfqf",
        tourAmount: 1500,
        touristsInfo: [
          {
            age: "25",
            name: "Dimon",
            sex: "Doter",
          },
          {
            age: "30",
            name: "Avraang",
            sex: "Male",
          },
        ],
        userInfo: {
          email: "",
          name: "Валера",
          phone: "88135105",
        },
      },
    ],
    bookingNumber: 12,
    cancelDeadline: "",
    contactInformation: "",
    maxPersonNum: 15,
    meetingPoint: "",
    meetingTime: "16.09.2023",
    personNum: 1,
    publicTourId: "1241",
    publicTourProfit: 5415,
    tour: {
      tourId: "12",
      tourName: "Пирамиды",
    },
    tourAmount: 1500,
    tourDate: {
      from: "2023-05-04T16:00:00.000Z",
      to: "2023-05-14T16:00:00.000Z",
    },
    updateDeadline: "",
  },
];

export const getPublicTours = async (
  params: {
    calendarDate: string;
  },
  successCallback: (params: IPublicTour[]) => void,
  errorCallback: () => void,
  useDefault: boolean
) => {
  if (useDefault) {
    successCallback(publicTourDefault);
    return;
  }
  try {
    let response = await axios.get<IPublicTour[]>(creatorUrl + "/public", {
      params: params,

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
