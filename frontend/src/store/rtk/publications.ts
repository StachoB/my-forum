import { PubliType } from "src/types/publiType";
import { baseApi } from "./base";

export const publicationEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get all publications
    getAllPubli: builder.query<PubliType[], {}>({
      query: () => ({
        url: "publications",
        method: "GET",
        data: {},
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const eventSourcePublications = new EventSource(
          "http://localhost:3000/sse/events"
        );
        try {
          await cacheDataLoaded;
          eventSourcePublications.onmessage = ({ data }) => {
            let eventData = JSON.parse(data);
            if (eventData.hasOwnProperty("insertedPubli")) {
              updateCachedData((draft) => {
                draft.unshift(eventData.insertedPubli);
              });
            } else if (eventData.hasOwnProperty("deletedPubli")) {
              updateCachedData((draft) => {
                var elementIndex = draft
                  .map(function (x) {
                    return x._id;
                  })
                  .indexOf(eventData.deletedPubli);
                draft.splice(elementIndex, 1);
              });
            }
          };
        } catch {}
        await cacheEntryRemoved;
        eventSourcePublications.close();
      },
      providesTags: ["Posts"],
    }),

    //post one publication
    postPubli: builder.mutation<void, { title: string; text: string }>({
      query: ({ title, text }) => ({
        url: "publications",
        method: "POST",
        data: { title, text },
      }),
      invalidatesTags: ["Posts"],
    }),

    //delete one publication (+ deletes his comments and likes)
    deletePubli: builder.mutation<void, { publiId: string }>({
      query: ({ publiId }) => ({
        url: `/publications/${publiId}`,
        method: "DELETE",
        data: {},
      }),
      invalidatesTags: ["Posts", "Likes"],
    }),

    //get number of publication of current user
    getNumberPubliUser: builder.query<number, void>({
      query: () => ({
        url: "/publications/analytics/nbPubli",
        method: "GET",
        data: {},
      }),
      providesTags: ["Posts"],
    }),

    //get number of publication made last week of current user
    getNumberPubliUserLastWeek: builder.query<number, void>({
      query: () => ({
        url: "/publications/analytics/nbPubli/lastWeek",
        method: "GET",
        data: {},
      }),
      providesTags: ["Posts"],
    }),

    //get the data for Pie Chart of analytics
    getAllUsersNbPubli: builder.query<
      { total_posts: number; _id: string }[],
      void
    >({
      query: () => ({
        url: "publications/analytics/pieChartData",
        method: "GET",
        data: {},
      }),
      providesTags: ["Users", "Posts"],
    }),
  }),
});

export const {
  useGetAllPubliQuery,
  usePostPubliMutation,
  useDeletePubliMutation,
  useGetNumberPubliUserQuery,
  useGetNumberPubliUserLastWeekQuery,
  useGetAllUsersNbPubliQuery,
} = publicationEndpoints;
