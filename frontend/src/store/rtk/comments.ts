import { CommentType } from "src/types/commentType";
import { baseApi } from "./base";

export const commentsEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postCom: builder.mutation<
      void,
      {
        text: string;
        post: string;
      }
    >({
      query: ({ text, post }) => ({
        url: "comments",
        method: "POST",
        data: { text, post },
      }),
      invalidatesTags: ["Comments"],
    }),

    deleteCom: builder.mutation<void, { comId: string }>({
      query: ({ comId }) => ({
        url: `comments/${comId}`,
        method: "DELETE",
        data: { comId },
      }),
      invalidatesTags: ["Comments"],
    }),

    getComPubli: builder.query<CommentType[], { publiId: string }>({
      query: ({ publiId }) => ({
        url: `comments/${publiId}`,
        method: "GET",
        data: {},
      }),
      providesTags: ["Comments"],
    }),
  }),
});

export const { usePostComMutation, useDeleteComMutation, useGetComPubliQuery } =
  commentsEndpoints;
