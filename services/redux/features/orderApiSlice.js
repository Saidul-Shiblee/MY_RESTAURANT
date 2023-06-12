import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/api/admin/orders",
      providesTags: ["orders"],
    }),
    editOrder: builder.mutation({
      query: ({ data, orderID }) => ({
        url: `/api/admin/orders/${orderID}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: (orderID) => ({
        url: `/api/admin/orders/${orderID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useDeleteOrderMutation,
  useEditOrderMutation,
} = ordersApiSlice;
