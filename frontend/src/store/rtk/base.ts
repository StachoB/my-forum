import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

export const baseApi = createApi({
  tagTypes: ["Posts", "Comments", "Users", "Likes"],
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
