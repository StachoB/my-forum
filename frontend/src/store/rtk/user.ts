import { baseApi } from "./base";

export const userEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postUser: builder.mutation<boolean, { username: string; password: string }>(
      {
        query: ({ username, password }) => ({
          url: "users",
          method: "POST",
          data: { username, password },
        }),
      }
    ),

    getUserById: builder.query<string, { userId: string }>({
      query: ({ userId }) => ({
        url: `users/${userId}`,
        method: "GET",
        data: { userId },
      }),
    }),

    getUser: builder.mutation<boolean, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: "users/auth",
        method: "POST",
        data: { username, password },
      }),
      invalidatesTags: ["Users", "Likes"],
    }),

    getProfile: builder.query<{ userId: string; username: string }, {}>({
      query: () => ({
        url: "profile",
        method: "GET",
        data: {},
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const {
  usePostUserMutation,
  useGetUserByIdQuery,
  useGetUserMutation,
  useGetProfileQuery,
} = userEndpoints;
