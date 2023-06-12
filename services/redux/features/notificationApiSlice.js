import { apiSlice } from "./apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/api/admin/notification",
      providesTags: ["notifications"],
    }),
    editNotification: builder.mutation({
      query: ({ notificationId, data }) => ({
        url: `/api/admin/notification/${notificationId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["notifications", "dashboardInfo"],
    }),
  }),
});

export const { useGetNotificationsQuery, useEditNotificationMutation } =
  notificationApiSlice;
