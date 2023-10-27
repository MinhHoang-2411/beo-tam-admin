import axios from "axios";
const URL_API_APP = import.meta.env.VITE_APP_API_URL_APP_WOO;

const ProductApi = {
  getListProducts(query: any) {
    const url = `${URL_API_APP}products`;
    const params = {
      ...query,
    };
    return axios.get(url, {
      params,
      auth: {
        username: import.meta.env.VITE_APP_WOOCOMMERCE_API_CLIENT,
        password: import.meta.env.VITE_APP_WOOCOMMERCE_API_SECRET,
      },
    });
  },
};

export default ProductApi;
