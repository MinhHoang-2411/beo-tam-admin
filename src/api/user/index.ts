import axiosClient from "../axiosClient";

const userApi = {
  //Admin
  getListAdmin() {
    const url = "/user";
    return axiosClient.get(url);
  },
  getDetailAdmin(id: any) {
    const url = `/user/${id}`;
    return axiosClient.get(url);
  },
  createAdmin(params: any) {
    const url = "/user";
    return axiosClient.post(url, params);
  },
  updateAdmin(params: any) {
    const url = "/user";
    return axiosClient.put(url, params);
  },
  deleteAdmin(id: any) {
    const url = `/user/${id}`;
    return axiosClient.delete(url);
  },

  //Customer
  getListCustomer() {
    const url = "/user/customer";
    return axiosClient.get(url);
  },
  getDetailCustomer(id: any) {
    const url = `/user/customer/${id}`;
    return axiosClient.get(url);
  },
  createCustomer(params: any) {
    const url = "/user/customer";
    return axiosClient.post(url, params);
  },
  updateCustomer(params: any) {
    const url = "/user/customer";
    return axiosClient.put(url, params);
  },
  deleteCustomer(id: any) {
    const url = `/user/customer/${id}`;
    return axiosClient.delete(url);
  },
};

export default userApi;
