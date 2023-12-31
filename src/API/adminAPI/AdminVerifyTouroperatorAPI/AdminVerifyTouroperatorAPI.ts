import axios from "axios";
import { ICreatorList } from "../../../models/adminModels/ICreatorList";
import { adminUrl } from "../../../config/config";
import { IChangeStatus } from "../../../models/adminModels/IChangeStatus";

const creatorDefault: ICreatorList[] = [
  {
    phone: "12414",
    email: "3242",
    name: "amogus",
    creatorId: "1",
    dataUser: {
      regisryId: "1",
      ceratorType: "bb",
      statusVerify: "1",
      changeVerifyDate: "11.24.11",
      documents: [
        {
          filename: "ss",
          path: "bb",
        },
      ],
    },
  },
];

export const getCreatorList = async (
  successCallback: (prop: ICreatorList[]) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(creatorDefault);
    return;
  }
  try {
    let response = await axios.get(adminUrl + "/creatorList ");
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

const creatorVerifyDefault: string = "2";

export const verifyCreator = async (
  successCallback: (prop: string) => void,
  params: IChangeStatus,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(creatorVerifyDefault);
    return;
  }
  try {
    let response = await axios.get(adminUrl + "/creatorVerify", {
      params: {
        creatorId: params.messageId,
        statusVerify: params.statusMessage,
      },
    });
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
