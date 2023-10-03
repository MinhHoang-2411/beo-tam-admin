import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loadable from "../components/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

const PublicRoutes = () => {
  const AuthLogin = Loadable(lazy(() => import("../pages/auth")));
  const ForgotPwd = Loadable(lazy(() => import("../pages/auth/forgotPwd")));
  return (
    <MinimalLayout>
      <Routes>
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/forgot-password" element={<ForgotPwd />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </MinimalLayout>
  );
};

export default PublicRoutes;
