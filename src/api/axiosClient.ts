import axios from "axios";
import history from "../routes/history";
import { getAuth, handleLogout } from "../utils/auth";
import isTokenExpired from "../utils/isTokenExpired";
import authApi from "./auth";

const URL_API = import.meta.env.VITE_APP_API_URL;

const axiosClient = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;

axiosClient.defaults.headers.Accept = "application/json";
// Add a request interceptor
axiosClient.interceptors.request.use(
  async function (config: any) {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    if (access_token) {
      if (refresh_token && isTokenExpired(refresh_token as string)) {
        handleLogout();
      }
      if (isTokenExpired(access_token)) {
        console.log("token hết hạn");
      }
      config.headers = {
        Authorization: `Bearer ${access_token}`,
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const refresh_token = localStorage.getItem("refresh_token");
    const originalRequest = error.config;
    console.log({ originalRequest });
    if (
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const response = await authApi.refreshToken({
        refresh_token,
      });
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.data.access_token;
      localStorage.setItem("access_token", response.data.data.access_token);
      localStorage.setItem("refresh_token", response.data.data.refresh_token);
      return axiosClient(originalRequest);
    }
    if (error?.response) {
      handleErrorApi(error?.response?.status);
    }
    return Promise.reject(error);
  }
);

const handleErrorApi = (status: number) => {
  switch (status) {
    case 401:
    case 403:
      handleLogout();
      break;

    case 500:
      history.replace("/500");
      break;
  }
};
