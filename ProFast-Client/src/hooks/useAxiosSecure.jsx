import React from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  axiosSecure.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
    return config;
  }),
    (error) => {
      return Promise.reject(error);
    };
  //********************* */
  axiosSecure.interceptors.response.use((res) => {
    return res;
  },
    (error) => {
      console.log(error);
      const status = error?.response?.status;
      console.log(status);
      if (status === 401 || status === 403) {
        console.warn("🚫 Unauthorized or Forbidden, redirecting...");
        navigate("/forbidden"); // ✅ Imperative redirect
      }

      return Promise.reject(error);
    });

  return axiosSecure;
};

export default useAxiosSecure;
