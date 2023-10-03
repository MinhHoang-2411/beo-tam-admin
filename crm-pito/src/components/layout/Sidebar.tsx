import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { layoutActions } from "../../store/layout/layoutSlice";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import { authActions } from "../../store/auth/authSlice";
import { colorToken } from "../../theme/colorToken";
import userImageDefault from "../../assets/user/user.png";
import KeyIcon from "@mui/icons-material/Key";
import logoPito from "../../assets/logo/log-beotam.svg";

const Item = ({ title, to, icon, selected, setSelected, navigate }: any) => {
  return (
    <MenuItem
      active={selected.toLowerCase() === title.toLowerCase()}
      onClick={() => {
        setSelected(title);
        navigate(to);
      }}
      icon={icon}
    >
      <Typography fontWeight="500">{title}</Typography>
    </MenuItem>
  );
};

const SidebarCustom = () => {
  const theme = useTheme();
  const [openOrganizerMenu, setOpenOrganizerMenu] = useState<boolean>(false);

  //test theme
  const mode = useAppSelector((state) => state.layout.theme);
  const colors = colorToken(mode);

  const userInfo = useAppSelector((state) => state.auth.dataUser);
  const location = useLocation();
  const path = location.pathname.replace("/", "");
  const isCollapseSidebar = useAppSelector(
    (state) => state.layout.isCollapseSidebar
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(path);
  }, [path]);

  const handleLogout = async () => {
    dispatch(
      authActions.logout({
        onNavigate: () => navigate("/login"),
      })
    );
  };

  return (
    <Box
      sx={{
        bgcolor: `${colors.sidebar.background}`,
        "& .ps-sidebar-root": {
          height: "100%",
          px: 1,
          borderRight: `1px solid ${colors.sidebar.border} !important`,
        },
        "& .ps-sidebar-container": {
          bgcolor: `${colors.sidebar.background} !important`,
        },
        "& .ps-active": {
          bgcolor: `${colors.sidebar.bgselect}`,
          borderRadius: 2,
          color: "#fff",
        },
        "& .ps-menuitem-root.ps-active > .ps-menu-button:hover": {
          bgcolor: `${colors.sidebar.bgselect}`,
          borderRadius: 2,
          color: "#fff",
        },
        "& .ps-menuitem-root > .ps-menu-button:hover": {
          bgcolor: `${colors.sidebar.bghover}`,
          borderRadius: 2,
        },
        "& .ps-menu-button": {
          borderRadius: 2,
          paddingLeft: "15px !important",
        },
        "& .ps-submenu-content": {
          padding: "4px",
          background: `${theme.palette.background.default} !important`,
          transition: `height 300ms !important`,
          display: openOrganizerMenu ? `block !important` : `none !important`,
          height: openOrganizerMenu ? `auto !important` : `0px !important`,
        },
        "& .ps-submenu-content.ps-open": {
          marginTop: isCollapseSidebar ? "80px !important" : "0",
        },
        "& .ps-menuitem-root": {
          marginBottom: "4px",
          borderRadius: 2,
        },
        position: "fixed",
        top: 0,
        bottom: 0,
        overflow: "auto",
      }}
    >
      <Sidebar collapsed={isCollapseSidebar}>
        <Menu>
          {/* LOGO AND MENU ICON */}
          {!isCollapseSidebar ? (
            <Box
              onClick={() => {
                navigate("/organizer/products");
              }}
              style={{
                margin: "10px 0 20px 0",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <img
                  style={{ cursor: "pointer" }}
                  width={180}
                  src={logoPito}
                  alt="logo"
                />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(layoutActions.toggleCollapseSidebar());
                  }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <MenuItem
              onClick={() => {
                dispatch(layoutActions.toggleCollapseSidebar());
              }}
              icon={<MenuOutlinedIcon />}
              style={{
                margin: "10px 0 20px 0",
                //   color: colors.grey[100],
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ py: "15px" }}
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(layoutActions.toggleCollapseSidebar());
                  }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            </MenuItem>
          )}

          <Box sx={{ mt: "40px" }}>
            {!isCollapseSidebar && (
              <Stack direction="row" spacing={1} sx={{ m: "20px 0 10px 10px" }}>
                <ApartmentIcon />
                <Typography variant="h5" fontWeight={600}>
                  Quản lý
                </Typography>
              </Stack>
            )}
            <MenuItem
              active={selected.toLowerCase().includes("products")}
              onClick={() => {
                setSelected("products");
                navigate("/products");
              }}
              icon={<CategoryIcon />}
            >
              <Typography fontWeight="500">Sản phẩm</Typography>
            </MenuItem>
            {/* <MenuItem
              active={
                selected.toLowerCase() === "organizer/consignments" ||
                selected.toLowerCase().includes("organizer/consignments")
              }
              onClick={() => {
                setSelected("organizer/consignments");
                navigate("/organizer/consignments");
              }}
              icon={<WysiwygIcon />}
            >
              <Typography fontWeight="500">Lô hàng</Typography>
            </MenuItem> */}
            <MenuItem
              active={selected.toLowerCase().includes("orders")}
              onClick={() => {
                setSelected("orders");
                navigate("/orders");
              }}
              icon={<WysiwygIcon />}
            >
              <Typography fontWeight="500">Đơn hàng</Typography>
            </MenuItem>

            {!isCollapseSidebar && (
              <Stack direction="row" spacing={1} sx={{ m: "10px 0 10px 10px" }}>
                <SettingsIcon />
                <Typography variant="h5" fontWeight={600}>
                  Cài đặt
                </Typography>
              </Stack>
            )}

            <MenuItem onClick={handleLogout} icon={<LogoutIcon />}>
              <Typography fontWeight="500">Đăng xuất</Typography>
            </MenuItem>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarCustom;
