import { defaultData } from "../../config/config";
import dayjs from "dayjs";
export const SET_TREE_WEEK = "SET_TREE_WEEK";
export const SET_SERVICES = "SET_SERVICES";
export const SET_SETTING_LIST = "SET_SETTING_LIST";
export const SET_SELECT_DATE = "SET_SELECT_DATE";
export const CLEAR_EVENT = "CLEAR_EVENT";
export const SET_EVENT = "SET_EVENT";
export const SET_SERVICE = "SET_SERVICE";
export const CLEAR_SERVICE = "CLEAR_SERVICE";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_SETTINGS = "SET_USER_SETTINGS";

const defaultState = {
  treeWeek: defaultData,
  services: [],
  settingList: [],
  selectDate: dayjs().toISOString(),
  event: {
    name: "",
    start: dayjs()
      .minute(Math.ceil(dayjs().minute() / 5) * 5)
      .toISOString(),
    end: dayjs()
      .minute(Math.ceil(dayjs().minute() / 5) * 5)
      .add(1, "hour")
      .toISOString(),
    services: [],
    repeatEnd: null,
    repeatWeek: [],
    id: undefined,
    globalId: undefined,
  },
  newService: {
    name: "",
    price: undefined,
    duration: null,
    maxBooking: undefined,
  },
  userInfo: { login: undefined, id: undefined, name: undefined },
  userSettings: [{ data: [], name: undefined }],
};

const DataReducer = (state = defaultState, action) => {
  console.log("DATA_REDUCER", action, state);
  let treeWeek = action?.payload?.treeWeek;
  switch (action.type) {
    case SET_TREE_WEEK:
      return {
        ...state,
        treeWeek: treeWeek,
        selectDate: dayjs(treeWeek[3].day).toISOString(),
      };
    case SET_SERVICES:
      return {
        ...state,
        services: action.payload.services,
      };
    case SET_SETTING_LIST:
      return {
        ...state,
        settingList: action.payload.settingList,
      };
    case SET_SELECT_DATE:
      return {
        ...state,
        selectDate: action.payload.selectDate,
      };
    case CLEAR_EVENT:
      return {
        ...state,
        event: {
          name: "",
          start: dayjs()
            .minute(Math.ceil(dayjs().minute() / 5) * 5)
            .toISOString(),
          end: dayjs()
            .minute(Math.ceil(dayjs().minute() / 5) * 5)
            .add(1, "hour")
            .toISOString(),
          services: [],
          repeatEnd: null,
          repeatWeek: [],
          id: 0,
          globalId: 0,
        },
      };
    case SET_EVENT:
      return {
        ...state,
        event: { ...state.event, ...action.payload },
      };
    case SET_SERVICE:
      return {
        ...state,
        newService: { ...state.newService, ...action.payload },
      };
    case CLEAR_SERVICE:
      return {
        ...state,
        newService: {
          name: "",
          price: undefined,
          duration: null,
          maxBooking: undefined,
        },
      };
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload.userInfo,
      };
    case SET_USER_SETTINGS:
      return {
        ...state,
        userSettings: action.payload.userSettings,
      };
    default:
      return state;
  }
};

export default DataReducer;

export const setTreeWeek = (treeWeek) => {
  return {
    type: SET_TREE_WEEK,
    payload: { treeWeek },
  };
};
export const setServices = (services) => {
  return {
    type: SET_SERVICES,
    payload: { services },
  };
};
export const setSettingList = (settingList) => {
  return {
    type: SET_SETTING_LIST,
    payload: { settingList },
  };
};
export const setSelectDate = (selectDate) => {
  return {
    type: SET_SELECT_DATE,
    payload: { selectDate: dayjs(selectDate).toISOString() },
  };
};
export const clearEvent = () => {
  return {
    type: CLEAR_EVENT,
  };
};
export const setEventName = (name = "") => {
  return {
    type: SET_EVENT,
    payload: { name },
  };
};
export const setEventStart = (start = undefined) => {
  const stringStart = typeof start === "string" ? start : start.toISOString();
  return {
    type: SET_EVENT,
    payload: { start: stringStart },
  };
};
export const setEventEnd = (end = undefined) => {
  const stringEnd = typeof end === "string" ? end : end.toISOString();
  return {
    type: SET_EVENT,
    payload: { end: stringEnd },
  };
};
export const setEventServices = (services = []) => {
  return {
    type: SET_EVENT,
    payload: { services },
  };
};
export const setEventRepeatEnd = (repeatEnd = null) => {
  const stringRepeatEnd =
    typeof repeatEnd === "string" ? repeatEnd : repeatEnd.toISOString();
  return {
    type: SET_EVENT,
    payload: { repeatEnd: stringRepeatEnd },
  };
};
export const setEventRepeatWeek = (repeatWeek = []) => {
  return {
    type: SET_EVENT,
    payload: { repeatWeek },
  };
};
export const setEventId = (id = 0) => {
  return {
    type: SET_EVENT,
    payload: { id },
  };
};
export const setEventGlobalId = (globalId = 0) => {
  return {
    type: SET_EVENT,
    payload: { globalId },
  };
};
export const setServiceName = (name = "") => {
  return {
    type: SET_SERVICE,
    payload: { name },
  };
};
export const setServicePrice = (price = 0) => {
  return {
    type: SET_SERVICE,
    payload: { price },
  };
};
export const setServiceDuration = (duration = null) => {
  return {
    type: SET_SERVICE,
    payload: { duration },
  };
};
export const setServiceMaxBooking = (maxBooking = 0) => {
  return {
    type: SET_SERVICE,
    payload: { maxBooking },
  };
};
export const clearService = () => {
  return {
    type: CLEAR_SERVICE,
  };
};
export const setUserInfo = (userInfo) => {
  return {
    type: SET_USER_INFO,
    payload: { userInfo },
  };
};
export const setUserSettings = (userSettings) => {
  return {
    type: SET_USER_SETTINGS,
    payload: { userSettings },
  };
};
