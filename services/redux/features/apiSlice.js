import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signOut } from "./authSlice";
import { refresh } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.accessToken;
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error && result.error?.data?.message === "jwt expired") {
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      "/api/auth/refresh",
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      // store the new token
      api.dispatch(refresh(refreshResult.data.accessToken));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(signOut({}));
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["products", "users", "orders", "notifications", "dashboardInfo"],
  endpoints: (builder) => ({}),
});
