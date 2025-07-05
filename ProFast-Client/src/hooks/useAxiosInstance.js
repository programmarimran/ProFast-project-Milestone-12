import axios from "axios";
import React from "react";
const axiosinstance = axios.create({
  baseURL: `http://localhost:3000`,
});
const useAxiosInstance = () => {
  return axiosinstance;
};

export default useAxiosInstance;
