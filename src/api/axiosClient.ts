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
    let token: any = getAuth();

    if (token) {
      if (isTokenExpired(token.refresh_token)) {
        handleLogout();
      }
      if (isTokenExpired(token.access_token)) {
        const response = await authApi.refreshToken({
          refresh_token: token.refresh_token,
        });
        token = response.data.data;
        localStorage.setItem("access_token", token.access_token);
        localStorage.setItem("refresh_token", token.refresh_token);
      }
      config.headers = {
        Authorization: `Bearer ${token.access_token}`,
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
