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
import { TOKEN } from "../config/types";
import { Cookies } from "react-cookie";

let cookie = new Cookies();

// const userInfoDefault: ICreatorInfo = {
//   typeUser: UserType.creator,
//   photo: "",
//   name: "Валера",
//   phone: "123123123123",
//   email: "2133123123123",
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
//       innOOO: "123123",
//       kppOOO: "13213123",
//       ogrnOOO: "12312312311321312323",
//       okpoOOO: "12312312312132131233",
//       okatoOOO: "12312312311321312323",
//       okvedOOO: "12312312311321312323",
//       urAdress: "12312312312313213123",
//       registryId: "123123123123",
//     },
//   },
// };

const userInfoDefault: ITouristInfo = {
  typeUser: UserType.tourist,
  photo: "",
  name: "Валера",
  phone: "123123123123",
  email: "2133123123123",
  banStatus: false,
  id: "1",
  createAt: "10-10-2010",
  dataUser: {
    region: "Владимирская область",
    sex: Sex.male,
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
  try {
    let response = await axios.post(urlUser + "/avatar ", data, {
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
