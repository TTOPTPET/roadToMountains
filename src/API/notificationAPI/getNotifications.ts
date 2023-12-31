import { creatorUrl } from "../../config/config";
import axios from "axios";
import { INotification } from "../../models/notificationModels/INotification";

const notificationsDefault: INotification[] = [
  {
    createAt: "2023-05-05T16:00:00.000Z",
    notifType: "Оповещение",
    notifData: {
      paymentStatus: "Не оплачен",
      tour: {
        tourId: "11515",
        tourName: "Пирамиды",
        tourDate: {
          from: "2023-05-07T16:00:00.000Z",
          to: "2023-06-07T16:00:00.000Z",
        },
      },
      amount: 1000,
      bookingId: 124,
    },
  },
  {
    createAt: "2023-05-05T16:00:00.000Z",
    notifData: {
      paymentStatus: "Оплачено",
      tour: {
        tourId: "11514",
        tourName: "Пирамиды говна",
        tourDate: {
          from: "2023-05-07T16:00:00.000Z",
          to: "2023-06-07T16:00:00.000Z",
        },
      },
      amount: 10000,
      bookingId: 123,
    },
  },
];

export const getNotifications = async (
  successCallback: (prop: INotification[]) => void,
  errorCallback: () => void,
  useDefault: boolean
) => {
  if (useDefault) {
    successCallback(notificationsDefault);
    return;
  }
  try {
    let response = await axios.get<INotification[]>(
      creatorUrl + "/notifications"
    );
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
