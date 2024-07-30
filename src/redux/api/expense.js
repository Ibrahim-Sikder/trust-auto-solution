import { baseApi } from "./baseApi";

const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpense: builder.mutation({
      query: (expenseInfo) => ({
        url: "/expenses",
        method: "POST",
        body: expenseInfo,
      }),
      invalidatesTags: ["expense"],
    }),
    getAllExpenses: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/expenses`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["expense"],
    }),

    getSingleExpense: builder.query({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["expense"],
    }),
    updateExpense: builder.mutation({
      query: (expenseInfo) => {
        return {
          url: `/expenses/${expenseInfo.id}`,
          method: "PUT",
          body: expenseInfo.data,
        };
      },
      invalidatesTags: ["expense"],
    }),

    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expense"],
    }),
  }),
});

export const {
  useCreateExpenseMutation,
  useGetAllExpensesQuery,
  useGetSingleExpenseQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
