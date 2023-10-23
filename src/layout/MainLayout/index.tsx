import { Box, Paper, useTheme } from "@mui/material";
import Navbar from "../../components/layout/Navbar";
import SidebarCustom from "../../components/layout/Sidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import LoadingOverLay from "../../components/LoadingOverLay";
import { colorToken } from "../../theme/colorToken";
import ConfirmModal from "../../components/modal/ConfirmModal";
import { useEffect } from "react";
import Breadcrumb from "../../components/BreadCrumb";
import CreateOrEditAdminModal from "../../components/modal/user/CreateOrEditAdmin";
import CreateOrEditCustomerModal from "../../components/modal/user/CreateOrEditCustomer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isCollapseSidebar = useAppSelector(
    (state) => state.layout.isCollapseSidebar
  );

  //test theme
  const mode = useAppSelector((state) => state.layout.theme);
  const colors = colorToken(mode);

  return (
    <>
      <SidebarCustom />
      <main
        className="content"
        style={
          !isCollapseSidebar
            ? { paddingLeft: "250px", transition: "padding 0.3s ease" }
            : { paddingLeft: "80px", transition: "padding 0.3s ease" }
        }
      >
        <Box sx={{ px: 4, pb: 4, pt: 3, bgcolor: colors.background.main }}>
          <Breadcrumb />
          <Paper sx={{ minHeight: "85vh" }}>{children}</Paper>
        </Box>
        <CreateOrEditAdminModal />
        <CreateOrEditCustomerModal />
        <ConfirmModal />
        <LoadingOverLay />
      </main>
    </>
  );
};
export default MainLayout;
