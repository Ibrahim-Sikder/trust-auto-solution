import { baseApi } from "./baseApi";

const supplierApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSupplier: builder.mutation({
      query: (supplierInfo) => ({
        url: "/suppliers",
        method: "POST",
        body: supplierInfo,
      }),
      invalidatesTags: ["supplier"],
    }),
    getAllSuppliers: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/suppliers`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["supplier"],
    }),

    getSingleSupplier: builder.query({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["supplier"],
    }),
    updateSupplier: builder.mutation({
      query: (customerInfo) => {
      
        return {
          url: `/suppliers/${customerInfo.id}`,
          method: "PUT",
          body: customerInfo.data,
        };
      },
      invalidatesTags: ["supplier"],
    }),

    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["supplier"],
    }),
  }),
});

export const {
  useCreateSupplierMutation,
  useGetAllSuppliersQuery,
  useGetSingleSupplierQuery,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = supplierApi;
