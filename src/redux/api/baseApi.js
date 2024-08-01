import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`,
  }),
  tagTypes: [
    "customer",
    "company",
    "showroom",
    "jobCard",
    "quotation",
    "invoice",
    "vehicle",
    "supplier",
    "employee",
    "attendance",
    "expense",
    "moneyReceipt",
  ],
  endpoints: () => ({}),
});
