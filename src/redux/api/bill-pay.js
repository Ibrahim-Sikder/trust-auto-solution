import { baseApi } from "./baseApi";

const billPayApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBillPay: builder.mutation({
      query: (billPayInfo) => ({
        url: "/bill-pays",
        method: "POST",
        body: billPayInfo,
      }),
      invalidatesTags: ["bill-pay"],
    }),
    getAllBillPays: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/bill-pays`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["bill-pay"],
    }),

    getSingleBillPay: builder.query({
      query: (id) => ({
        url: `/bill-pays/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["bill-pay"],
    }),
    updateBillPay: builder.mutation({
      query: (billPayInfo) => {
        return {
          url: `/bill-pays/${billPayInfo.id}`,
          method: "PUT",
          body: billPayInfo.data,
        };
      },
      invalidatesTags: ["bill-pay"],
    }),

    deleteBillPay: builder.mutation({
      query: (id) => ({
        url: `/bill-pays/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bill-pay"],
    }),
  }),
});

export const {
  useCreateBillPayMutation,
  useGetAllBillPaysQuery,
  useGetSingleBillPayQuery,
  useUpdateBillPayMutation,
  useDeleteBillPayMutation,
} = billPayApi;
