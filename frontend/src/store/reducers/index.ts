import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "../rtk/base";
import { userSlice } from "../slices/user";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
