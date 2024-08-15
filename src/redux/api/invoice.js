import { baseApi } from "./baseApi";

const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: (invoiceInfo) => ({
        url: "/invoices",
        method: "POST",
        body: invoiceInfo,
      }),
      invalidatesTags: ["invoice"],
    }),
    getAllInvoices: builder.query({
      query: ({ id, limit, page, searchTerm }) => ({
        url: `/invoices`,
        method: "GET",
        params: { id, limit, page, searchTerm },
      }),
      providesTags: ["invoice"],
    }),

    getSingleInvoice: builder.query({
      query: (id) => ({
        url: `/invoices/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["invoice"],
    }),

    updateInvoice: builder.mutation({
      query: (invoiceInfo) => {
        return {
          url: `/invoices/${invoiceInfo.id}`,
          method: "PUT",
          body: invoiceInfo.data,
        };
      },
      invalidatesTags: ["invoice"],
    }),
    removeInvoice: builder.mutation({
      query: (invoiceInfo) => {
        return {
          url: `/invoices/remove-invoice`,
          method: "PATCH",
          body: invoiceInfo.data,
          params: { id: invoiceInfo.id },
        };
      },
      invalidatesTags: ["invoice"],
    }),

    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `/invoices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invoice"],
    }),
  }),
});

export const {
  useCreateInvoiceMutation,
  useGetAllInvoicesQuery,
  useGetSingleInvoiceQuery,
  useUpdateInvoiceMutation,
  useRemoveInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;

