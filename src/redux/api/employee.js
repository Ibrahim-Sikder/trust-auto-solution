import { baseApi } from "./baseApi";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (employeeInfo) => ({
        url: "/employees",
        method: "POST",
        body: employeeInfo,
      }),
      invalidatesTags: ["employee"],
    }),
    getAllEmployees: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/employees`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["employee", "attendance"],
    }),

    getSingleEmployee: builder.query({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["employee"],
    }),
    updateEmployee: builder.mutation({
      query: (employeeInfo) => {
        return {
          url: `/employees/${employeeInfo.id}`,
          method: "PUT",
          body: employeeInfo.data,
        };
      },
      invalidatesTags: ["employee"],
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employee"],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useGetAllEmployeesQuery,
  useGetSingleEmployeeQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
