import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";

const PrivateRoutes = () => {
  const Orders = Loadable(lazy(() => import("../pages/order")));
  const OrderDetail = Loadable(
    lazy(() => import("../pages/order/detail/OrderDetail"))
  );
  const CreateOrder = Loadable(
    lazy(() => import("../pages/order/create/CreateOrder"))
  );
  const Products = Loadable(lazy(() => import("../pages/product")));
  const CreateProduct = Loadable(
    lazy(() => import("../pages/product/create/CreateProduct"))
  );
  const ProductDetail = Loadable(
    lazy(() => import("../pages/product/detail/ProductDetail"))
  );
  const Admin = Loadable(lazy(() => import("../pages/admin")));
  const AdminDetail = Loadable(lazy(() => import("../pages/admin/detail")));
  const Customer = Loadable(lazy(() => import("../pages/customer")));
  const CustomerDetail = Loadable(
    lazy(() => import("../pages/customer/detail"))
  );
  return (
    <MainLayout>
      <Routes>
        <Route path="/*" element={<Navigate to="/orders" />} />
        <Route path="/login" element={<Navigate to="/orders" />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/orders/create" element={<CreateOrder />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/:id" element={<AdminDetail />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/customer/:id" element={<CustomerDetail />} />
      </Routes>
    </MainLayout>
  );
};

export default PrivateRoutes;
