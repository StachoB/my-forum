import { PubliType } from "src/types/publiType";
import { baseApi } from "./base";

export const publicationEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPubli: builder.query<
      {
        _id: string;
        title: string;
        text: string;
        date: string;
        user: string;
      }[],
      {}
    >({
      query: () => ({
        url: "publications",
        method: "GET",
        data: {},
      }),
      providesTags: ["Posts"],
    }),

    postPubli: builder.mutation<
      any,
      { title: string; text: string; user: string }
    >({
      query: ({ title, text, user }) => ({
        url: "publications",
        method: "POST",
        data: { title, text, user },
      }),
      invalidatesTags: ["Posts"],
    }),

    deletePubli: builder.mutation<any, { publiId: string }>({
      query: ({ publiId }) => ({
        url: `/publications/${publiId}`,
        method: "DELETE",
        data: {},
      }),
      invalidatesTags: ["Posts"],
    }),

    getOnePubli: builder.query<
      {
        _id: string;
        title: string;
        text: string;
        date: string;
        user: string;
      },
      { publiId: string }
    >({
      query: ({ publiId }) => ({
        url: `/publications/${publiId}`,
        method: "GET",
        data: { publiId },
      }),
    }),
  }),
});

export const {
  useGetAllPubliQuery,
  usePostPubliMutation,
  useDeletePubliMutation,
  useGetOnePubliQuery,
} = publicationEndpoints;
