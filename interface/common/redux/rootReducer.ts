import { combineReducers } from "@reduxjs/toolkit";
import fetchReducer from "./reducers/fetchReducer";
import createModalReducer from "./reducers/modalReducer";
import types from "./types";

const rootReducers = combineReducers({
  [types.userInfo]: fetchReducer(types.userInfo),
});

export default rootReducers;
