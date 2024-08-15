import { baseApi } from "./baseApi";

const moneyReceiptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMoneyReceipt: builder.mutation({
      query: (moneyReceiptInfo) => ({
        url: "/money-receipts",
        method: "POST",
        body: moneyReceiptInfo,
      }),
      invalidatesTags: ["moneyReceipt"],
    }),
    getAllMoneyReceipts: builder.query({
      query: ({ id, limit, page, searchTerm }) => ({
        url: `/money-receipts`,
        method: "GET",
        params: { id, limit, page, searchTerm },
      }),
      providesTags: ["moneyReceipt"],
    }),

    getSingleMoneyReceipt: builder.query({
      query: (id) => ({
        url: `/money-receipts/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["moneyReceipt"],
    }),
    updateMoneyReceipt: builder.mutation({
      query: (moneyReceiptInfo) => {
        return {
          url: `/money-receipts/${moneyReceiptInfo.id}`,
          method: "PUT",
          body: moneyReceiptInfo.data,
        };
      },
      invalidatesTags: ["moneyReceipt"],
    }),

    deleteMoneyReceipt: builder.mutation({
      query: (id) => ({
        url: `/money-receipts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["moneyReceipt"],
    }),
  }),
});

export const {
  useCreateMoneyReceiptMutation,
  useGetAllMoneyReceiptsQuery,
  useGetSingleMoneyReceiptQuery,
  useUpdateMoneyReceiptMutation,
  useDeleteMoneyReceiptMutation,
} = moneyReceiptApi;
