import { apiSlice } from "./apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardInfo: builder.query({
      query: () => "/api/admin",
      providesTags: ["dashboardInfo"],
    }),
  }),
});

export const { useGetDashboardInfoQuery } = dashboardApiSlice;
