import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import AddTourReducer from "./AddTour/AddTourReducer";
import ModalReducer from "./Modal/ModalReducer";

const rootReducer = combineReducers({
  addTour: AddTourReducer,
  modal: ModalReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
