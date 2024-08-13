import { baseApi } from "./baseApi";

const donationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDonation: builder.mutation({
      query: () => ({
        url: "/donation",
        method: "POST",
      }),
      invalidatesTags: ["donation"],
    }),
    getAllDonation: builder.query({
      query: () => ({
        url: `/donation`,
        method: "GET",
      }),
      providesTags: ["donation"],
    }),
    getSingleDonation: builder.mutation({
      query: (id) => ({
        url: `/donation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["donation"],
    }),

    deleteDonation: builder.mutation({
      query: (id) => ({
        url: `/donation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["donation"],
    }),
  }),
});

export const {
  useCreateDonationMutation,
  useGetAllDonationQuery,
  useGetSingleDonationMutation,
  useDeleteDonationMutation,
} = donationApi;
