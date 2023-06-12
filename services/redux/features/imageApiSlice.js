import { apiSlice } from "./apiSlice";

export const imageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteImage: builder.mutation({
      query: (publicId) => ({
        url: `/api/admin/deleteImage`,
        method: "DELETE",
        body: { public_id: publicId },
      }),
    }),
  }),
});

export const { useDeleteImageMutation } = imageApiSlice;
