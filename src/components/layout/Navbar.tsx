import {
  Avatar,
  Box,
  Chip,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { layoutActions } from "../../store/layout/layoutSlice";
import SearchIcon from "@mui/icons-material/Search";
import userImageDefault from "../../assets/user/user.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const userInfo = useAppSelector((state) => state.auth.dataUser);
  const theme = useAppSelector((state) => state.layout.theme);
  const dispatch = useAppDispatch();
  const toggleTheme = () => {
    if (theme == "dark") {
      dispatch(layoutActions.changeTheme("light"));
    } else {
      dispatch(layoutActions.changeTheme("dark"));
    }
  };
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" sx={{ px: 4, py: 2 }} justifyContent="flex-end">
      {/* <Box display="flex" sx={{ px: 4, py: 2 }} justifyContent="space-between"> */}
      <Box>
        <Chip
          size="medium"
          variant="outlined"
          avatar={
            <Avatar alt={userInfo?.name || "user"} src={userImageDefault} />
          }
          label={userInfo?.name}
          color="primary"
          onClick={handleClick}
        />
        <Menu
          id="action_menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ mt: 1 }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
              navigate("/profile/changepwd");
            }}
          >
            Đổi mật khẩu
          </MenuItem>
        </Menu>
      </Box>

      {/* SEARCH BAR */}
      {/* <Box display="flex" sx={{ bgcolor: "#fff" }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: "300px" }}
          placeholder="Search"
        />
      </Box> */}

      {/* ICONS */}
      {/* <Stack direction="row" alignItems="center" spacing={1}> */}
      {/* <IconButton
          sx={{
            width: "40px",
            height: "40px",
          }}
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
      {/* <IconButton sx={{ width: "40px", height: "40px" }}>
          <NotificationsOutlinedIcon />
        </IconButton> */}
      {/* <IconButton sx={{ width: "40px", height: "40px" }}>
          <SettingsOutlinedIcon />
        </IconButton> */}
      {/* <IconButton sx={{ width: "40px", height: "40px" }}>
          <PersonOutlinedIcon />
        </IconButton> */}
      {/* <Chip
          size="medium"
          variant="outlined"
          avatar={
            <Avatar alt={userInfo?.name || "user"} src={userImageDefault} />
          }
          label={userInfo?.name}
          color="primary"
          onClick={handleClick}
        />
        <Menu
          id="action_menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ mt: 1 }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
              navigate("/profile/changepwd");
            }}
          >
            Đổi mật khẩu
          </MenuItem>
        </Menu> */}
      {/* </Stack> */}
    </Box>
  );
};

export default Navbar;
