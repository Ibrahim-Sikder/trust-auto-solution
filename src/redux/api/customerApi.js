import { baseApi } from "./baseApi";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (customerInfo) => ({
        url: "/customers",
        method: "POST",
        body: customerInfo,
      }),
      invalidatesTags: ["customer"],
    }),
    getAllCustomers: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/customers`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["customer", "vehicle", "jobCard", "quotation", "invoice"],
    }),

    getSingleCustomer: builder.query({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["customer", "vehicle", "jobCard", "quotation", "invoice"],
    }),
    updateCustomer: builder.mutation({
      query: (customerInfo) => {
        console.log(customerInfo);
        return {
          url: `/customers/${customerInfo.id}`,
          method: "PUT",
          body: customerInfo.data,
        };
      },
      invalidatesTags: ["customer"],
    }),

    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["customer"],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetAllCustomersQuery,
  useGetSingleCustomerQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
