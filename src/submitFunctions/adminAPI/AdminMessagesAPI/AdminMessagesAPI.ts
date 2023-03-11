import axios from "axios";
import { IUserMessage } from "../../../models/adminModels/IUsersMessage";
import { adminUrl } from "../../../config/config";
import { TOKEN } from "../../../config/types";
import { Cookies } from "react-cookie";
import { IChangeStatus } from "../../../models/adminModels/IChangeStatus";

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

const changeStatusDefault: IChangeStatus = {
  messageId: "1",
  statusMessage: "Bugaga",
};

export const changeMessageStatus = async (
  successCallback: (prop: IChangeStatus) => void,
  params: IChangeStatus,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(changeStatusDefault);
    return;
  }
  try {
    let respone = await axios.put(adminUrl + "/errorMessage/changeStatus", {
      params: params,
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    });
    successCallback(respone?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
