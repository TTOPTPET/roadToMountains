import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import AddTourReducer from "./AddTour/AddTourReducer";
import ModalReducer from "./Modal/ModalReducer";
import UserInfoReducer from "./UserInfo/UserInfoReducer";
import TourInfoReducer from "./TourInfo/TourInfoReducer";
import PhotoReducer from "./Photo/PhotoReducer";

export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  addTour: AddTourReducer,
  modal: ModalReducer,
  userInfo: UserInfoReducer,
  tourInfo: TourInfoReducer,
  photoToDelete: PhotoReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
