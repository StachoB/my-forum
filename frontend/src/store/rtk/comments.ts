import { CommentType } from "src/types/commentType";
import { baseApi } from "./base";

export const commentsEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //post a comment
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

    //delete a comment
    deleteCom: builder.mutation<void, { comId: string }>({
      query: ({ comId }) => ({
        url: `comments/${comId}`,
        method: "DELETE",
        data: { comId },
      }),
      invalidatesTags: ["Comments"],
    }),

    //get all comments form one publication
    getComPubli: builder.query<CommentType[], { publiId: string }>({
      query: ({ publiId }) => ({
        url: `comments/${publiId}`,
        method: "GET",
        data: {},
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const eventSourceComments = new EventSource(
          `http://localhost:3000/sse/commentevents/${arg.publiId}`
        );
        try {
          await cacheDataLoaded;
          eventSourceComments.onmessage = ({ data }) => {
            let eventData = JSON.parse(data);
            if (
              eventData.hasOwnProperty("insertedComment") &&
              eventData.insertedComment.post === arg.publiId
            ) {
              updateCachedData((draft) => {
                draft.push(eventData.insertedComment);
              });
            } else if (
              eventData.hasOwnProperty("deletedComment") &&
              eventData.deletedComment.post === arg.publiId
            ) {
              updateCachedData((draft) => {
                var elementIndex = draft
                  .map(function (x) {
                    return x._id;
                  })
                  .indexOf(eventData.deletedComment._id);
                draft.splice(elementIndex, 1);
              });
            }
          };
        } catch {}
        await cacheEntryRemoved;
        eventSourceComments.close();
      },
      providesTags: ["Comments"],
    }),
  }),
});

export const { usePostComMutation, useDeleteComMutation, useGetComPubliQuery } =
  commentsEndpoints;
