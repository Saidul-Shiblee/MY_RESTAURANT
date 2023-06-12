import { useSelector, useDispatch } from "react-redux";
import { axiosPublic } from "../lib/axios";
import { getAuth, refresh } from "../services/redux/features/authSlice";

export const useRefresh = () => {
  const dispatch = useDispatch();
  const REFRESH_URL = "/api/auth/refresh";

  const refreshToken = async () => {
    const result = await axiosPublic.get(REFRESH_URL, {
      withCredentials: true,
    });
    dispatch(refresh(result.data.accessToken));
    return result.data.accessToken;
  };
  return refreshToken;
};
