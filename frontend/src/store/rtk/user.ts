import { baseApi } from "./base";

export const userEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      {
        username: string;
        password: string;
      },
      {}
    >({
      query: () => ({
        url: "users",
        method: "GET",
        data: {},
      }),
    }),

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

    getUser: builder.mutation<any, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: "users/auth",
        method: "POST",
        data: { username, password },
      }),
    }),

    getProfile: builder.query<{ userId: string; username: string }, {}>({
      query: () => ({
        url: "profile",
        method: "GET",
        data: {},
      }),
    }),

    getUserId: builder.mutation<{ userId: string; username: string }, {}>({
      query: () => ({
        url: "profile",
        method: "GET",
        data: {},
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  usePostUserMutation,
  useGetUserByIdQuery,
  useGetUserMutation,
  useGetProfileQuery,
  useGetUserIdMutation,
} = userEndpoints;
