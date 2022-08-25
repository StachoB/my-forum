import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "../rtk/base";
import { commentsEndpoints } from "../rtk/comments";
import { publicationEndpoints } from "../rtk/publications";
import { userEndpoints } from "../rtk/user";
import { userSlice } from "../slices/user";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
