import axiosClient from "../axiosClient";
const URL_API_APP = import.meta.env.VITE_APP_API_URL_APP;

const OrderApi = {
  getListOrders(query: any) {
    const url = `${URL_API_APP}order`;
    const params = {
      ...query,
    };
    return axiosClient.get(url, {
      params,
    });
  },
  getDetailOrder(id: any) {
    const url = `${URL_API_APP}order/${id}`;
    return axiosClient.get(url);
  },
  deleteOrder(id: any) {
    const url = `${URL_API_APP}order/${id}`;
    return axiosClient.delete(url);
  },
  createOrder(params:any) {
    const url =`${URL_API_APP}order`
    return axiosClient.post(url,params)
  }
};

export default OrderApi;
