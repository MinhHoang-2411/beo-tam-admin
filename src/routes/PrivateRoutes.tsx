import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";

const PrivateRoutes = () => {
  const Orders = Loadable(lazy(() => import("../pages/order")));
  const OrderDetail = Loadable(
    lazy(() => import("../pages/order/detail/OrderDetail"))
  );

  const Products = Loadable(lazy(() => import("../pages/product")));
  const Admin = Loadable(lazy(() => import("../pages/admin")));
  const Customer = Loadable(lazy(() => import("../pages/customer")));
  return (
    <MainLayout>
      <Routes>
        <Route path="/*" element={<Navigate to="/orders" />} />
        <Route path="/login" element={<Navigate to="/orders" />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </MainLayout>
  );
};

export default PrivateRoutes;
