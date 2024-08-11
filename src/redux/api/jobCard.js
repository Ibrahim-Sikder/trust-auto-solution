import { baseApi } from "./baseApi";

const jobCardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createJobCard: builder.mutation({
      query: (jobCardInfo) => ({
        url: "/jobCards",
        method: "POST",
        body: jobCardInfo,
      }),
      invalidatesTags: ["jobCard"],
    }),
    getAllJobCards: builder.query({
      query: ({ id, limit, page, searchTerm }) => ({
        url: `/jobCards`,
        method: "GET",
        params: { id,limit, page, searchTerm },
      }),
      providesTags: ["jobCard"],
    }),
    

    getSingleJobCard: builder.query({
      query: (id) => ({
        url: `/jobCards/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["jobCard"],
    }),
    getSingleJobCardWithJobNo: builder.query({
      query: (jobNo) => ({
        url: `/jobCards/getWithJobNo`,
        method: "GET",
        params: { jobNo },
      }),
      invalidatesTags: ["jobCard"],
    }),
    updateJobCard: builder.mutation({
      query: (jobCardInfo) => {
        return {
          url: `/jobCards/${jobCardInfo.id}`,
          method: "PUT",
          body: jobCardInfo.data,
        };
      },
      invalidatesTags: ["jobCard"],
    }),

    deleteJobCard: builder.mutation({
      query: (id) => ({
        url: `/jobCards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobCard"],
    }),
  }),
});

export const {
  useCreateJobCardMutation,
  useGetAllJobCardsQuery,
  useGetSingleJobCardQuery,
  useGetSingleJobCardWithJobNoQuery,
  useUpdateJobCardMutation,
  useDeleteJobCardMutation,
} = jobCardApi;
