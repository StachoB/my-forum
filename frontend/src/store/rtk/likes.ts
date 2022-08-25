import { baseApi } from "./base";

export const likesEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postLike: builder.mutation<void, { post: string }>({
      query: ({ post }) => ({
        url: "likes",
        method: "POST",
        data: { post },
      }),
      invalidatesTags: ["Likes"],
    }),

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

    getIsPubliLiked: builder.query<number, { publiId: string }>({
      query: ({ publiId }) => ({
        url: `/likes/${publiId}/isLiked`,
        method: "GET",
        data: { publiId },
      }),
      providesTags: ["Likes"],
    }),

    getTotalLikes: builder.query<number, void>({
      query: () => ({
        url: "likes/numberLikes/total",
        method: "GET",
        data: {},
      }),
      providesTags: ["Likes"],
    }),

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
