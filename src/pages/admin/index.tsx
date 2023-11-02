import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import AdminTable from "./AdminTable";
import {
  InputAdornment,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { debounceSearch } from "../../utils/debounceSearch";
import { totalPagePagination } from "../../utils/pagination";
import { userActions } from "../../store/user/userSlice";
import CustomButton from "../../components/share/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { layoutActions } from "../../store/layout/layoutSlice";

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector((state) => state.user.paginationAdmin);
  const [searchAdmin, setSearchAdmin] = useState("");
  const [params, setParams] = useState<{
    page_size: number;
    page: number;
    name?: string;
  }>({ page_size: 10, page: 1 });

  const debounceSearchListOrders = useCallback(debounceSearch, []);

  const handlePagination = (e: any, value: number) => {
    setParams((prevState) => {
      return { ...prevState, page: value };
    });
  };

  const handleOpenAddAdminModal = () => {
    dispatch(layoutActions.openModalAdmin());
  };

  const handleSearchAdmin = (value: string) => {
    setSearchAdmin(value);
    // debounceSearchListOrders(value.trim(), setParams);
  };

  useEffect(() => {
    dispatch(userActions.getListAdmin());
  }, [params]);
  return (
    <>
      <Stack
        sx={{
          padding: "12px 12px 0 12px",
        }}
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: "350px" }}
          placeholder="Tìm kiếm"
          // size="small"
          value={searchAdmin}
          onChange={(e) => handleSearchAdmin(e.target.value)}
        />
        <CustomButton
          Icon={<AddIcon />}
          color="primary"
          onClick={handleOpenAddAdminModal}
          label="Thêm quản trị viên"
        />
      </Stack>
      <Stack sx={{ minHeight: "85vh" }} justifyContent="space-between">
        <AdminTable />
        <Stack sx={{ py: "20px" }}>
          <Pagination
            count={pagination ? totalPagePagination(pagination) : 1}
            page={pagination?.page || 1}
            onChange={handlePagination}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default AdminPage;
