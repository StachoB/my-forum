import { baseApi } from "./base";

export const commentsEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCom: builder.query<
      {
        _id: string;
        text: string;
        date: string;
        user: string;
        post: string;
      }[],
      {}
    >({
      query: () => ({
        url: "comments",
        method: "GET",
        data: {},
      }),
    }),

    postCom: builder.mutation<
      {},
      {
        text: string;
        user: string;
        post: string;
      }
    >({
      query: ({ text, user, post }) => ({
        url: "comments",
        method: "POST",
        data: { text, user, post },
      }),
      invalidatesTags: ["Comments"],
    }),

    deleteCom: builder.mutation<{}, { comId: string }>({
      query: ({ comId }) => ({
        url: `comments/${comId}`,
        method: "DELETE",
        data: { comId },
      }),
      invalidatesTags: ["Comments"],
    }),

    getComPubli: builder.query<
      {
        _id: string;
        text: string;
        date: string;
        user: string;
        post: string;
      }[],
      { publiId: string }
    >({
      query: ({ publiId }) => ({
        url: `comments/${publiId}`,
        method: "GET",
        data: {},
      }),
      providesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetAllComQuery,
  usePostComMutation,
  useDeleteComMutation,
  useGetComPubliQuery,
} = commentsEndpoints;
