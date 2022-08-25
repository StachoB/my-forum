import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { localStorageAuthMiddleware } from "./middlewares/localStorageAuth";
import { loginMiddleware } from "./middlewares/login";
import rootReducer from "./reducers";
import { baseApi } from "./rtk/base";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .prepend(localStorageAuthMiddleware, loginMiddleware)
      .concat(thunkMiddleware, baseApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
//Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
