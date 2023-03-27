import {
  IUserInfo,
  strongUserType,
  UserType,
  CreatorType,
  StatusVerify,
  Sex,
} from "../../models/userModels/IUserInfo";
enum actionTypes {
  SET_USER_INFO = "SET_USER_INFO",
}

interface IActionProps {
  props: IUserInfo;
}

interface IAction {
  type: actionTypes;
  payload?: IActionProps;
}

interface IDefaultState {
  userInfo: IUserInfo;
}

const defaultState: IDefaultState = {
  userInfo: {
    // type: strongUserType.CreatorOOO,
    // typeUser: UserType.creator,
    // photo: "",
    // name: "Валера",
    // phone: "123123123123",
    // email: "2133123123123",
    // banStatus: false,
    // id: "1",
    // createAt: "10-10-2010",
    // dataUser: {
    //   documents: [],
    //   dataVerify: "123",
    //   creatorType: CreatorType.OOO,
    //   statusVerify: StatusVerify.verified,
    //   fieldsCreator: {
    //     innOOO: "123123",
    //     kppOOO: "13213123",
    //     ogrnOOO: "12312312311321312323",
    //     okpoOOO: "12312312312132131233",
    //     okatoOOO: "12312312311321312323",
    //     okvedOOO: "12312312311321312323",
    //     urAdress: "12312312312313213123",
    //     registryId: "123123123123",
    //   },
    // },
    // type: strongUserType.CreatorIP,
    // typeUser: UserType.creator,
    // photo: "",
    // name: "Андрюха",
    // phone: "88889991133",
    // email: "andruha228@mail.ru",
    // banStatus: false,
    // id: "1",
    // createAt: "10-10-2010",
    // dataUser: {
    //   documents: [],
    //   dataVerify: "123",
    //   creatorType: CreatorType.IP,
    //   statusVerify: StatusVerify.verified,
    //   fieldsCreator: {
    //     innIP: "123123",
    //     egripIP: "123",
    //     adressIP: "МУХОСРАНСК",
    //     ogrnipIP: "123123",
    //   },
    // },
    // type: strongUserType.CreatorSELF,
    // typeUser: UserType.creator,
    // photo: "",
    // name: "Анатолий",
    // phone: "123123123123",
    // email: "2133123123123",
    // banStatus: false,
    // id: "1",
    // createAt: "10-10-2010",
    // dataUser: {
    //   documents: [],
    //   dataVerify: "123",
    //   creatorType: CreatorType.SELF,
    //   statusVerify: StatusVerify.verified,
    //   fieldsCreator: {
    //     innSELF: "123123",
    //     adressSELF: "DKSFJSLDFSVMC",
    //     pasportSELF: "17 16 432555",
    //   },
    // },
    type: strongUserType.Tourist,
    typeUser: UserType.tourist,
    photo: "",
    name: "Валера",
    phone: "123123123123",
    email: "2133123123123",
    banStatus: false,
    id: "1",
    createAt: "10-10-2010",
    dataUser: {
      sex: Sex.other,
      region: "Владимир",
    },
  },
};

const UserInfoReducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return {
        ...state,
        tourFields: { ...state.userInfo, ...action.payload },
      };

    default:
      return state;
  }
};

export default UserInfoReducer;

export const setUserInfo = (props: IUserInfo) => {
  return {
    type: actionTypes.SET_USER_INFO,
    payload: props,
  };
};
