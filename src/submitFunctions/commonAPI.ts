import axios from "axios";
import {
  CreatorType,
  ICreatorInfo,
  ITouristInfo,
  StatusVerify,
  UserType,
} from "../models/userModels/IUserInfo";
import { urlUser } from "../config/config";
import { TOKEN } from "../config/types";
import { Cookies } from "react-cookie";

let cookie = new Cookies();

const userInfoDefault: ICreatorInfo = {
  typeUser: UserType.creator,
  photo: "",
  name: "Валера",
  phone: "123123123123",
  email: "2133123123123",
  banStatus: false,
  id: "1",
  createAt: "10-10-2010",
  dataUser: {
    documents: [
      { name: "123123", docUrl: "asjkdha" },
      { name: "qwerty", docUrl: "nvmc,x." },
    ],
    dataVerify: "123",
    creatorType: CreatorType.OOO,
    statusVerify: StatusVerify.verified,
    fieldsCreator: {
      innOOO: "123123",
      kppOOO: "13213123",
      ogrnOOO: "12312312311321312323",
      okpoOOO: "12312312312132131233",
      okatoOOO: "12312312311321312323",
      okvedOOO: "12312312311321312323",
      urAdress: "12312312312313213123",
      registryId: "123123123123",
    },
  },
};

export const getUserInfo = async (
  successCallback: (prop: ICreatorInfo | ITouristInfo) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(userInfoDefault);
    return;
  }
  try {
    let response = await axios.get(urlUser + "/userInfo ", {
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

export const postUserInfo = async (
  successCallback: (prop: ICreatorInfo | ITouristInfo) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(userInfoDefault);
    return;
  }
  const data = {};
  try {
    let response = await axios.post(urlUser + "/userInfo ", data, {
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
