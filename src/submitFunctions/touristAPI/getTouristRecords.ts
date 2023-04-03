import axios from "axios";
import { touristUrl } from "../../config/config";
import { TOKEN } from "../../config/types";
import { Cookies } from "react-cookie";
import { IUserRecord } from "../../models/userModels/IUserRecord";

let cookie = new Cookies();

const recordsDefault: IUserRecord[] = [
  {
    publicTourId: "1234",
    bookingId: 1,
    bookingStatus: {
      payment: "Оплачено",
      cancellation: "",
      past: false,
    },
    tourDate: {
      from: "2023-04-07T16:00:00.000Z",
      to: "2023-04-17T16:00:00.000Z",
    },
    tourAmount: 1000,
    contactInformation:
      "Сопровождающий Валера, телефон для связи +7(228)322-13-37",
    meetingPoint: "г. Барнаул, ул. Ленина, 14 (у главного входа)",
    meetingTime: "12:00",
    bookingNumber: 123,
    tour: {
      tourId: "1141414",
      tourName: "Египетские пирамиды",
      housingInclud: {
        housingAddress: "ул. Иванова",
        housingName: "Гроб",
        housingDescription: "150",
      },
      insuranceInclude: {
        insuranceNumber: 10404,
        insuranceAmount: 24234,
      },
      freeServices: ["бассейн", "фен", "аукс"],
    },
  },
  {
    publicTourId: "2234",
    bookingId: 2,
    bookingStatus: {
      payment: "Оплачено",
      cancellation: "",
      past: true,
    },
    tourDate: {
      from: "2022-04-07T16:00:00.000Z",
      to: "2022-04-17T16:00:00.000Z",
    },
    tourAmount: 10000,
    contactInformation:
      "Сопровождающий Валера, телефон для связи +7(228)322-13-37",
    meetingPoint: "г. Барнаул, ул. Ленина, 14 (у главного входа)",
    meetingTime: "12:00",
    bookingNumber: 1231,
    tour: {
      tourId: "1141414",
      tourName: "Египетские пирамиды",
      housingInclud: {
        housingAddress: "ул. Иванова",
        housingName: "Гроб",
        housingDescription: "150",
      },
      insuranceInclude: {
        insuranceNumber: 10404,
        insuranceAmount: 24234,
      },
      freeServices: ["бассейн", "фен", "аукс"],
    },
  },
  {
    publicTourId: "1334",
    bookingId: 3,
    bookingStatus: {
      payment: "Оплачено",
      cancellation: "",
      past: false,
    },
    tourDate: {
      from: "2023-05-07T16:00:00.000Z",
      to: "2023-05-17T16:00:00.000Z",
    },
    tourAmount: 5000,
    contactInformation:
      "Сопровождающий Валера, телефон для связи +7(228)322-13-37",
    meetingPoint: "г. Барнаул, ул. Ленина, 14 (у главного входа)",
    meetingTime: "12:00",
    bookingNumber: 123,
    tour: {
      tourId: "1141414",
      tourName: "Египетские пирамиды",
      housingInclud: {
        housingAddress: "ул. Иванова",
        housingName: "Гроб",
        housingDescription: "150",
      },
      insuranceInclude: {
        insuranceNumber: 10404,
        insuranceAmount: 24234,
      },
      freeServices: ["бассейн", "фен", "аукс"],
    },
  },
];

export const getTouristRecords = async (
  successCallback: (prop: IUserRecord[]) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(recordsDefault);
    return;
  }
  try {
    let response = await axios.get<IUserRecord[]>(touristUrl + "/myBookings", {
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
    successCallback(response?.data as IUserRecord[]);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
