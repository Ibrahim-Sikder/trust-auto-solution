import { baseApi } from "./baseApi";

const showRoomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShowRoom: builder.mutation({
      query: (showroomInfo) => ({
        url: "/showrooms",
        method: "POST",
        body: showroomInfo,
      }),
      invalidatesTags: ["showroom"],
    }),
    getAllShowRooms: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/showrooms`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["showroom"],
    }),

    getSingleShowRoom: builder.query({
      query: (id) => ({
        url: `/showrooms/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["showroom"],
    }),
    updateShowRoom: builder.mutation({
      query: (showroomInfo) => {
        return {
          url: `/showrooms/${showroomInfo.id}`,
          method: "PUT",
          body: showroomInfo.data,
        };
      },
      invalidatesTags: ["showroom"],
    }),

    deleteShowRoom: builder.mutation({
      query: (id) => ({
        url: `/showrooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["showroom"],
    }),
  }),
});

export const {
  useCreateShowRoomMutation,
  useGetAllShowRoomsQuery,
  useGetSingleShowRoomQuery,
  useUpdateShowRoomMutation,
  useDeleteShowRoomMutation,
} = showRoomApi;
