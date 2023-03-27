import { IUserInfo } from "../../models/userModels/IUserInfo";
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

const defaultState: IDefaultState = { userInfo: undefined };

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
