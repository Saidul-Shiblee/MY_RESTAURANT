import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: (body) => ({
        url: "/api/user/check_user",
        method: "POST",
        body,
      }),
    }),
    getUsers: builder.query({
      query: () => "/api/user",
      providesTags: ["users"],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "/api/user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    editUser: builder.mutation({
      query: ({ body, userId }) => ({
        url: `/api/user/${userId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/api/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
  useGetUserMutation,
} = userApiSlice;
