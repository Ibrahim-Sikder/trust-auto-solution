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
    getAllVehicles: builder.query({
      query: ({ id, limit, page, searchTerm }) => ({
        url: `/vehicles`,
        method: "GET",
        params: { id, limit, page, searchTerm },
      }),
      providesTags: ["vehicle"],
    }),

    getSingleVehicle: builder.query({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["vehicle"],
    }),

    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vehicle"],
    }),
  }),
});

export const {
  useCreateVehicleMutation,
  useGetAllVehiclesQuery,
  useGetSingleVehicleQuery,
  useDeleteVehicleMutation,
} = vehicleApi;
