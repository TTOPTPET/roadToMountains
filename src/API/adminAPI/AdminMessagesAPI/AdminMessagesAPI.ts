import axios from "axios";
import { IUserMessage } from "../../../models/adminModels/IUsersMessage";
import { adminUrl } from "../../../config/config";
import { IChangeStatus } from "../../../models/adminModels/IChangeStatus";

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
    typeMessage: "проблема с туром",
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
  {
    userId: "2",
    userInfo: {
      phone: "8-999-999-99-99",
      email: "crazy_biker@mail.ru",
      name: "SEREGGA",
    },
    messageId: "2",
    statusMessage: "work",
    typeMessage: "проблема с туром",
    dataMessage: {
      tourInfo: {
        tourDate: {
          from: "1",
          to: "2",
        },
        tourId: "1",
        publicTourId: "1000",
        tourName: "PIVO",
        creatorName: "VOVAN",
      },
      message:
        "Пыхтит паровозик, гудит паровозик, покоя нет никому, устал паровозик, уснул паровозик, налейте пива ему",
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
    let response = await axios.get(adminUrl + "/usersMessage ");
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
      params,
    });
    successCallback(respone?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
