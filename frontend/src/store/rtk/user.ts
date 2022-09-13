import { baseApi } from "./base";

export const userEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //sign up a user
    postUser: builder.mutation<boolean, { username: string; password: string }>(
      {
        query: ({ username, password }) => ({
          url: "users",
          method: "POST",
          data: { username, password },
        }),
      }
    ),

    //get id of current user
    getUserId: builder.query<string, void>({
      query: () => ({
        url: `users/userId`,
        method: "GET",
        data: {},
      }),
    }),

    //get username from id of user
    getUserById: builder.query<string, { userId: string }>({
      query: ({ userId }) => ({
        url: `users/${userId}`,
        method: "GET",
        data: { userId },
      }),
    }),

    //know if user+password exists
    getUser: builder.mutation<boolean, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: "users/auth",
        method: "POST",
        data: { username, password },
      }),
      invalidatesTags: ["Users", "Likes"],
    }),

    //get id and username of current user
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
  useGetUserIdQuery,
} = userEndpoints;
