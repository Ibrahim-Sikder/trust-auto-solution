import { baseApi } from "./baseApi";

const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation({
      query: (companyInfo) => ({
        url: "/companies",
        method: "POST",
        body: companyInfo,
      }),
      invalidatesTags: ["company"],
    }),
    getAllCompanies: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/companies`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["company"],
    }),

    getSingleCompany: builder.query({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["company"],
    }),
    updateCompany: builder.mutation({
      query: (companyInfo) => {
        return {
          url: `/companies/${companyInfo.id}`,
          method: "PUT",
          body: companyInfo.data,
        };
      },
      invalidatesTags: ["company"],
    }),

    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetAllCompaniesQuery,
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
