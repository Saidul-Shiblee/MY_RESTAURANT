import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: process.env.BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
