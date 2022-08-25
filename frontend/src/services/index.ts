import axios, { AxiosInstance } from "axios";
import history from "../lib/history";
import { clearState } from "src/store/slices/user";
import store from "../store";
import { useDispatch } from "react-redux";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    if (state.user.access_token !== "") {
      const { access_token } = state.user;
      if (config.headers) {
        config.headers["Authorization"] = `Bearer ${access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error;
    if (error.response.status === 401) {
      store.dispatch(clearState());
      history.push("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
