import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_LIMI, //http://localhost:4444
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  if (window.localStorage.getItem("token")) {
    config.headers.Authorization = window.localStorage.getItem("token");
  }
  return config;
});

export default instance;
