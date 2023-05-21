import axios from "axios";
import {
  CreatorType,
  ICreatorInfo,
  ITouristInfo,
  Sex,
  StatusVerify,
  UserType,
} from "../models/userModels/IUserInfo";
import { urlUser } from "../config/config";
import imageCompression from "browser-image-compression";
import { IErrorMessage } from "../models/errorMessageModels/IErrorMessage";

// const userInfoDefault: ICreatorInfo = {
//   typeUser: UserType.creator,
//   photo:
//     "https://sun9-54.userapi.com/impg/ZX9ad_1-MZrr8ifdvx7ze3A0dS1cygxCiRxrqg/gUGrJhMpjOk.jpg?size=900x920&quality=95&sign=a419c5b74139bd33f5cda9a584478c45&type=album",
//   name: "Валера",
//   phone: "+7(999)999-99-99",
//   email: "email@mail.ru",
//   banStatus: false,
//   id: "1",
//   createAt: "10-10-2010",
//   dataUser: {
//     documents: [
//       { name: "123123", docUrl: "asjkdha", lastModified: 123123 },
//       { name: "qwerty", docUrl: "nvmc,x.", lastModified: 1231233123123 },
//     ],
//     dataVerify: "123",
//     creatorType: CreatorType.OOO,
//     statusVerify: StatusVerify.verified,
//     fieldsCreator: {
//       innOOO: "38 48484848488",
//       kppOOO: "474747474477474",
//       ogrnOOO: "674589895678",
//       okpoOOO: "345678908",
//       okatoOOO: "4567",
//       okvedOOO: "2563636",
//       urAdress: "г. Барнаул, ул. Ленина, д. 239б, оф. 9",
//       registryId: "123123123123",
//     },
//   },
// };

const userInfoDefault: ICreatorInfo = {
  typeUser: UserType.creator,
  photo:
    "https://sun9-54.userapi.com/impg/ZX9ad_1-MZrr8ifdvx7ze3A0dS1cygxCiRxrqg/gUGrJhMpjOk.jpg?size=900x920&quality=95&sign=a419c5b74139bd33f5cda9a584478c45&type=album",
  name: "Валера",
  phone: "+7(999)999-99-99",
  email: "email@mail.ru",
  banStatus: false,
  id: "1",
  createAt: "10-10-2010",
  dataUser: {
    documents: [
      { documentName: "123123", documentPath: "asjkdha" },
      {
        documentName: "qwerty",
        documentPath: "nvmc,x.",
      },
    ],
    dataVerify: "123",
    creatorType: CreatorType.IP,
    statusVerify: StatusVerify.sendVerified,
    fieldsCreator: {
      ogrnipIP: "674589895678",
      innIP: "38 48484848488",
      egripIP: "474747474477474",
      adressIP: "г. Барнаул, ул. Ленина, д. 239б, оф. 9",
    },
  },
};

// const userInfoDefault: ICreatorInfo = {
//   typeUser: UserType.creator,
//   photo:
//     "https://sun9-54.userapi.com/impg/ZX9ad_1-MZrr8ifdvx7ze3A0dS1cygxCiRxrqg/gUGrJhMpjOk.jpg?size=900x920&quality=95&sign=a419c5b74139bd33f5cda9a584478c45&type=album",
//   name: "Валера",
//   phone: "+7(999)999-99-99",
//   email: "email@mail.ru",
//   banStatus: false,
//   id: "1",
//   createAt: "10-10-2010",
//   dataUser: {
//     documents: [
//       { name: "123123", docUrl: "asjkdha", lastModified: 123123 },
//       { name: "qwerty", docUrl: "nvmc,x.", lastModified: 1231233123123 },
//     ],
//     dataVerify: "123",
//     creatorType: CreatorType.SELF,
//     statusVerify: StatusVerify.notVerified,
//     fieldsCreator: {
//       pasportSELF: "674589895678",
//       innSELF: "38 48484848488",
//       adressSELF: "г. Барнаул, ул. Ленина, д. 239б, оф. 9",
//     },
//   },
// };

// const userInfoDefault: ITouristInfo = {
//   typeUser: UserType.tourist,
//   photo: "",
//   name: "Валера",
//   phone: "123123123123",
//   email: "2133123123123",
//   banStatus: false,
//   id: "1",
//   createAt: "10-10-2010",
//   dataUser: {
//     region: "Владимирская область",
//     sex: Sex.male,
//   },
// };

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
    let response = await axios.get(urlUser + "/userInfo ");
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const postUserAvatar = async (
  data: File,
  successCallback: (prop: string) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(
      "https://mimigram.ru/wp-content/uploads/2020/07/mimibook.jpg"
    );
    return;
  }
  const avatar = new FormData();
  const resizedFile: File = await imageCompression(data, {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1080,
    useWebWorker: true,
  });
  avatar.append("photo", resizedFile);

  try {
    let response = await axios.post(urlUser + "/avatar ", avatar);
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};

export const postErrorMessage = async (
  tour: boolean,
  data: IErrorMessage,
  successCallback: (prop: any) => void,
  errorCallback?: () => void
) => {
  try {
    let response = await axios.post(urlUser + "/errorMessage", data, {
      params: { tour },
    });
    successCallback(response?.status);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
