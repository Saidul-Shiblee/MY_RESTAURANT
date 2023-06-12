import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (productName) => `/api/admin/products?productName=${productName}`,
    }),
    getProducts: builder.query({
      query: () => "/api/admin/products",
      providesTags: ["products"],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/api/admin/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["products"],
    }),
    editProduct: builder.mutation({
      query: ({ data, productId }) => ({
        url: `/api/admin/products/${productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/admin/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
} = productsApiSlice;
