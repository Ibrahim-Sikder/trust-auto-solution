import { baseApi } from "./baseApi";

const salaryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSalary: builder.mutation({
      query: (salaryInfo) => ({
        url: "/salary",
        method: "POST",
        body: salaryInfo,
      }),
      invalidatesTags: ["salary", "employee"],
    }),

    getAllSalary: builder.query({
      query: ({ searchTerm }) => ({
        url: `/salary`,
        method: "GET",
        params: { searchTerm },
      }),
      providesTags: ["salary"],
    }),

    getSingleSalary: builder.query({
      query: (date) => ({
        url: `/salary/${date}`,
        method: "GET",
      }),
      invalidatesTags: ["salary"],
    }),

    deleteSalary: builder.mutation({
      query: (salaryInfo) => ({
        url: "/salary/remove",
        method: "PUT",
        body: salaryInfo,
      }),
      invalidatesTags: ["salary"],
    }),
  }),
});

export const { useCreateSalaryMutation, useGetAllSalaryQuery } = salaryApi;
