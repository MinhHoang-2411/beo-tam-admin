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
    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refreshToken");
    if (access_token) {
      if (refresh_token && isTokenExpired(refresh_token as string)) {
        handleLogout();
      }
      if (isTokenExpired(access_token)) {
        const response = await authApi.refreshToken({
          refresh_token: refresh_token,
        });
        access_token = response.data.data.access_token;
        refresh_token = response.data.data.refresh_token;
        localStorage.setItem("access_token", response.data.data.access_token);
        localStorage.setItem("refresh_token", response.data.data.refresh_token);
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
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
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
