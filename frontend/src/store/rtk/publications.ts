import { PubliType } from "src/types/publiType";
import { baseApi } from "./base";

export const publicationEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPubli: builder.query<PubliType[], {}>({
      query: () => ({
        url: "publications",
        method: "GET",
        data: {},
      }),
      providesTags: ["Posts"],
    }),

    postPubli: builder.mutation<void, { title: string; text: string }>({
      query: ({ title, text }) => ({
        url: "publications",
        method: "POST",
        data: { title, text },
      }),
      invalidatesTags: ["Posts"],
    }),

    deletePubli: builder.mutation<void, { publiId: string }>({
      query: ({ publiId }) => ({
        url: `/publications/${publiId}`,
        method: "DELETE",
        data: {},
      }),
      invalidatesTags: ["Posts", "Likes"],
    }),

    getOnePubli: builder.query<PubliType, { publiId: string }>({
      query: ({ publiId }) => ({
        url: `/publications/${publiId}`,
        method: "GET",
        data: { publiId },
      }),
    }),

    getNumberPubliUser: builder.query<number, void>({
      query: () => ({
        url: "/publications/analytics/nbPubli",
        method: "GET",
        data: {},
      }),
      providesTags: ["Posts"],
    }),

    getNumberPubliUserLastWeek: builder.query<number, void>({
      query: () => ({
        url: "/publications/analytics/nbPubli/lastWeek",
        method: "GET",
        data: {},
      }),
      providesTags: ["Posts"],
    }),

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
  useGetOnePubliQuery,
  useGetNumberPubliUserQuery,
  useGetNumberPubliUserLastWeekQuery,
  useGetPieChartDataQuery,
} = publicationEndpoints;
