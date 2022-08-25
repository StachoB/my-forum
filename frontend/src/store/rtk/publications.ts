import { PubliType } from "src/types/publiType";
import { baseApi } from "./base";

export const publicationEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get all publications
    getAllPubli: builder.query<PubliType[], {}>({
      query: () => ({
        url: "publications",
        method: "GET",
        data: {},
      }),
      providesTags: ["Posts"],
    }),

    //post one publication
    postPubli: builder.mutation<void, { title: string; text: string }>({
      query: ({ title, text }) => ({
        url: "publications",
        method: "POST",
        data: { title, text },
      }),
      invalidatesTags: ["Posts"],
    }),

    //delete one publication (+ deletes his comments and likes)
    deletePubli: builder.mutation<void, { publiId: string }>({
      query: ({ publiId }) => ({
        url: `/publications/${publiId}`,
        method: "DELETE",
        data: {},
      }),
      invalidatesTags: ["Posts", "Likes"],
    }),

    //get number of publication of current user
    getNumberPubliUser: builder.query<number, void>({
      query: () => ({
        url: "/publications/analytics/nbPubli",
        method: "GET",
        data: {},
      }),
      providesTags: ["Posts"],
    }),

    //get number of publication made last week of current user
    getNumberPubliUserLastWeek: builder.query<number, void>({
      query: () => ({
        url: "/publications/analytics/nbPubli/lastWeek",
        method: "GET",
        data: {},
      }),
      providesTags: ["Posts"],
    }),

    //get the data for Pie Chart of analytics
    getPieChartData: builder.query<(string | number)[][], void>({
      query: () => ({
        url: "publications/analytics/pieChartData",
        method: "GET",
        data: {},
      }),
      providesTags: ["Users", "Posts"],
    }),
  }),
});

export const {
  useGetAllPubliQuery,
  usePostPubliMutation,
  useDeletePubliMutation,
  useGetNumberPubliUserQuery,
  useGetNumberPubliUserLastWeekQuery,
  useGetPieChartDataQuery,
} = publicationEndpoints;
