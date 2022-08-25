import { baseApi } from "./base";

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
    getNumberLikesPubli: builder.query<
      {
        numLikes: number;
      },
      { publiId: string }
    >({
      query: ({ publiId }) => ({
        url: `/likes/${publiId}`,
        method: "GET",
        data: { publiId },
      }),
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
    getTotalLikes: builder.query<number, void>({
      query: () => ({
        url: "likes/numberLikes/total",
        method: "GET",
        data: {},
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
