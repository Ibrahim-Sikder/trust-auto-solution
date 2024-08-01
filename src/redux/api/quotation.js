import { baseApi } from "./baseApi";

const quotationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuotation: builder.mutation({
      query: (quotationInfo) => ({
        url: "/quotations",
        method: "POST",
        body: quotationInfo,
      }),
      invalidatesTags: ["quotation"],
    }),
    getAllQuotations: builder.query({
      query: ({ id,limit, page, searchTerm }) => ({
        url: `/quotations`,
        method: "GET",
        params: { id ,limit, page, searchTerm },
      }),
      providesTags: ["quotation"],
    }),

    getSingleQuotation: builder.query({
      query: (id) => ({
        url: `/quotations/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["quotation"],
    }),
    
    updateQuotation: builder.mutation({
      query: (quotationInfo) => {
        return {
          url: `/quotations/${quotationInfo.id}`,
          method: "PUT",
          body: quotationInfo.data,
        };
      },
      invalidatesTags: ["quotation"],
    }),
    removeQuotation: builder.mutation({
      query: (quotationInfo) => {
        return {
          url: `/quotations/remove-quotation`,
          method: "PATCH",
          body: quotationInfo.data,
          params: { id: quotationInfo.id },
        };
      },
      invalidatesTags: ["quotation"],
    }),

    deleteQuotation: builder.mutation({
      query: (id) => ({
        url: `/quotations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["quotation"],
    }),
  }),
});

export const {
  useCreateQuotationMutation,
  useGetAllQuotationsQuery,
  useGetSingleQuotationQuery,
  useUpdateQuotationMutation,
  useDeleteQuotationMutation,
  useRemoveQuotationMutation
 
} = quotationApi;
