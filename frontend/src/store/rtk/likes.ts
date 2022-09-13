import { baseApi } from "./base";
import io from "socket.io-client";

export const likesEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //post a like
    postLike: builder.mutation<void, { post: string }>({
      query: ({ post }) => ({
        url: "likes",
        method: "POST",
        data: { post },
      }),
      invalidatesTags: ["Likes"],
    }),

    //get total of likes of one publication
    getNumberLikesPubli: builder.query<number, { publiId: string }>({
      query: ({ publiId }) => ({
        url: `/likes/${publiId}`,
        method: "GET",
        data: { publiId },
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = io("http://localhost:3000");
        try {
          await cacheDataLoaded;
          socket.on("events", function (data) {
            console.log("premier cas", data);
            if (
              data.hasOwnProperty("insertedLike") &&
              data.insertedLike.postId === arg.publiId
            ) {
              updateCachedData((draft) => {
                draft++;
                return draft;
              });
            } else if (
              data.hasOwnProperty("deletedLike") &&
              data.deletedLike.postId === arg.publiId
            ) {
              updateCachedData((draft) => {
                draft--;
                return draft;
              });
            }
          });
        } catch {}
        await cacheEntryRemoved;
        socket.close();
      },
      providesTags: ["Likes"],
    }),

    //know if a publication is liked by current user or not
    getIsPubliLiked: builder.query<number, { publiId: string }>({
      query: ({ publiId }) => ({
        url: `/likes/${publiId}/isLiked`,
        method: "GET",
        data: { publiId },
      }),

      providesTags: ["Likes"],
    }),

    //get total of likes of current user
    getTotalLikes: builder.query<number, { userId: string | undefined }>({
      query: ({ userId }) => ({
        url: "likes/numberLikes/total",
        method: "GET",
        data: { userId },
      }),
      providesTags: ["Likes"],
    }),

    //get last week likes of current user
    getLastWeekLikes: builder.query<number, void>({
      query: () => ({
        url: "likes/numberLikes/lastWeek",
        method: "GET",
        data: {},
      }),
      providesTags: ["Likes"],
    }),
  }),
});

export const {
  usePostLikeMutation,
  useGetNumberLikesPubliQuery,
  useGetIsPubliLikedQuery,
  useGetTotalLikesQuery,
  useGetLastWeekLikesQuery,
} = likesEndpoints;
