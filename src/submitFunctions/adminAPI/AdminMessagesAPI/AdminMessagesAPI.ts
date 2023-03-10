import axios from "axios";
import { IUserMessage } from "../../../models/adminModels/IUsersMessage";
import { adminUrl } from "../../../config/config";
import { TOKEN } from "../../../config/types";
import { Cookies } from "react-cookie";

let cookie = new Cookies();

const userMessageDefault: IUserMessage[] = [
  {
    userId: "1",
    userInfo: {
      phone: "11",
      email: "aba",
      name: "mr",
    },
    messageId: "1",
    statusMessage: "work",
    typeMessage: "spam",
    dataMessage: {
      tourInfo: {
        tourDate: {
          from: "1",
          to: "2",
        },
        tourId: "1",
        publicTourId: "1",
        tourName: "aaaa",
        creatorName: "amogus",
      },
      message: "214",
    },
    createAt: new Date(),
  },
];

export const getUserMessages = async (
  successCallback: (prop: IUserMessage[]) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(userMessageDefault);
    return;
  }
  try {
    let response = await axios.get(adminUrl + "/usersMessage ", {
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
