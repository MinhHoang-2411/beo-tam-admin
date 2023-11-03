import axios from "axios";
import axiosClient from "../axiosClient";

const authApi = {
  login(params: any) {
    const url = "/auth/login";
    return axiosClient.post(url, params);
  },
  refreshToken(params: any) {
    const url = "https://beotam-api.stdio.asia/auth/refresh-token";
    return axios.post(url, params);
  },
};

export default authApi;
