import React from "react";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../lib/axios";
import { getAuth } from "../services/redux/features/authSlice";
import { useRefresh } from "./useRefresh";

export const usePrivateAxios = () => {
  const auth = useSelector(getAuth);
  const refreshToken = useRefresh();

  React.useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prvRequest = error?.config;
        if (
          error?.response?.data?.error?.message === "jwt expired" &&
          !prvRequest?.sent
        ) {
          prvRequest.sent = true;
          const newAccessToken = await refreshToken();
          prvRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prvRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refreshToken]);

  return axiosPrivate;
};

export default usePrivateAxios;
