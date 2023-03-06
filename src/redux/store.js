import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { DataReducer, ModalReducer } from "./reducers";

const rootReducer = combineReducers({
  data: DataReducer,
  modal: ModalReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
