import axios from "axios";
import axiosClient from "../axiosClient";
const URL_API_APP = import.meta.env.VITE_APP_API_URL_APP;

// const ProductApi = {
//   getListProducts(query: any) {
//     const url = `${URL_API_APP}products`;
//     const params = {
//       ...query,
//     };
//     return axios.get(url, {
//       params,
//       auth: {
//         username: import.meta.env.VITE_APP_WOOCOMMERCE_API_CLIENT,
//         password: import.meta.env.VITE_APP_WOOCOMMERCE_API_SECRET,
//       },
//     });
//   },

// };
const ProductApi = {
  getListProducts(query: any) {
    const url = `${URL_API_APP}product`;
    const params = {
      ...query,
    };
    return axiosClient.get(url, {
      params,
    });
  },
  getDetailProduct(id: any) {
    const url = `${URL_API_APP}product/${id}`;
    return axiosClient.get(url);
  },
};

export default ProductApi;
