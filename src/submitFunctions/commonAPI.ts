import axios from "axios";
import {
  IUserInfo,
  CreatorType,
  Sex,
  StatusVerify,
  UserType,
  strongUserType,
} from "../models/userModels/IUserInfo";
import { urlUser } from "../config/config";
import { TOKEN } from "../config/types";
import { Cookies } from "react-cookie";

let cookie = new Cookies();

const userInfoDefault: IUserInfo =
  // {
  //   type: strongUserType.CreatorOOO,
  //   dataUser: {
  //     documents: [
  //       { docName: "Имя файла", docUrl: "fdff" },
  //       { docName: "Имя файла", docUrl: "fdff" },
  //       { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //       // { docName: "Имя файла", docUrl: "fdff" },
  //     ],
  //     dataVerify: "2023-03-15T16:47:46.915652+00:00",
  //     creatorType: CreatorType.OOO,
  //     statusVerify: StatusVerify.verified,
  //     fieldsCreator: {
  //       innOOO: "123123",
  //       kppOOO: "1231231231",
  //       ogrnOOO: "4567",
  //       okpoOOO: "235543",
  //       okatoOOO: "354342",
  //       okvedOOO: "43.12",
  //       urAdress: "Адрес",
  //       registryId: "123",
  //     },
  //   },
  //   photo: "",
  //   name: "Виталя",
  //   phone: "88005553535",
  //   email: "vitalya_truboeb",
  //   banStatus: false,
  //   typeUser: UserType.creator,
  //   id: "1",
  //   createAt: "1975",
  // };
  // {
  //   type: strongUserType.CreatorIP,
  //   dataUser: {
  //     documents: [{ docName: "ddd", docUrl: "fdff" }],
  //     dataVerify: "2011-02-28",
  //     creatorType: CreatorType.IP,
  //     statusVerify: StatusVerify.notVerified,
  //     fieldsCreator: {
  //       innIP: "123123",
  //       egripIP: "777",
  //       adressIP: "1488",
  //       ogrnipIP: "228",
  //     },
  //   },
  //   photo: "",
  //   name: "Алексей",
  //   phone: "8123456789",
  //   email: "nagibator",
  //   banStatus: true,
  //   typeUser: UserType.creator,
  //   id: "2",
  //   createAt: "2007",
  // };
  // {
  //   type: strongUserType.CreatorSELF,
  //   dataUser: {
  //     documents: [],
  //     dataVerify: "2001-12-11",
  //     creatorType: CreatorType.SELF,
  //     statusVerify: StatusVerify.sendVerified,
  //     fieldsCreator: {
  //       innSELF: "123123",
  //       adressSELF: "3464634",
  //       pasportSELF: "123123123",
  //     },
  //   },
  //   photo: "",
  //   name: "Вася",
  //   phone: "89997772244",
  //   email: "vasya_pupkin2006",
  //   banStatus: true,
  //   typeUser: UserType.creator,
  //   id: "3",
  //   createAt: "2018",
  // };
  {
    type: strongUserType.Tourist,
    dataUser: {
      sex: Sex.male,
      region: "Владимирская область",
    },
    photo: "",
    name: "Андрей",
    phone: "82342354341",
    email: "123123",
    banStatus: false,
    typeUser: UserType.tourist,
    id: "3",
    createAt: "2018",
  };

export const getUserInfo = async (
  successCallback: (prop: IUserInfo) => void,
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
  successCallback: (prop: IUserInfo) => void,
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
