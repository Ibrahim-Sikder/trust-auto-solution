import { baseApi } from "./baseApi";

const vehicleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVehicle: builder.mutation({
      query: (vehicleInfo) => ({
        url: "/vehicles",
        method: "POST",
        body: vehicleInfo,
      }),
      invalidatesTags: ["vehicle"],
    }),
    // getAllCompanies: builder.query({
    //   query: ({ limit, page, searchTerm }) => ({
    //     url: `/companies`,
    //     method: "GET",
    //     params: { limit, page, searchTerm },
    //   }),
    //   providesTags: ["company"],
    // }),

    // getSingleCompany: builder.query({
    //   query: (id) => ({
    //     url: `/companies/${id}`,
    //     method: "GET",
    //   }),
    //   invalidatesTags: ["company"],
    // }),
    // updateCompany: builder.mutation({
    //   query: (companyInfo) => {
    //     return {
    //       url: `/companies/${companyInfo.id}`,
    //       method: "PUT",
    //       body: companyInfo.data,
    //     };
    //   },
    //   invalidatesTags: ["company"],
    // }),

    // deleteCompany: builder.mutation({
    //   query: (id) => ({
    //     url: `/companies/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["company"],
    // }),
  }),
});

export const { useCreateVehicleMutation } = vehicleApi;
