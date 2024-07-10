import { combineReducers } from "@reduxjs/toolkit";
import fetchReducer from "./reducers/fetchReducer";
import types from "./types";

const rootReducers = combineReducers({
  [types.listGames]: fetchReducer(types.listGames),
  [types.listWithdraw]: fetchReducer(types.listWithdraw)
});

export default rootReducers;
