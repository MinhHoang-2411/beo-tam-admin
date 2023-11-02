import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import OrdersTable from "./OrdersTable";
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
import { orderActions } from "../../store/order/orderSlice";
import { totalPagePagination } from "../../utils/pagination";

const MemberPage = () => {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector((state) => state.order.pagination);
  const [searchOrder, setSearchOrder] = useState("");
  const [params, setParams] = useState<{
    page_size: number;
    page: number;
    search?: string;
    status?: string;
  }>({ page_size: 10, page: 1 });
  const [orderStatusLabel, setProductStatus] = useState("");
  const [listStatus] = useState([
    { label: "Tất cả", value: "" },
    { label: "Đang xử lý", value: "pending" },
    { label: "Chờ thanh toán", value: "processing" },
    { label: "Tạm giữ", value: "on-hold" },
    { label: "Đã hoàn thành", value: "completed" },
    { label: "Đã hủy", value: "cancelled" },
    { label: "Đã hoàn lại tiền", value: "refunded" },
    { label: "Thất bại", value: "failed" },
    { label: "Đã xóa", value: "Draft" },
  ]);

  const debounceSearchListOrders = useCallback(debounceSearch, []);

  const handlePagination = (e: any, value: number) => {
    setParams((prevState) => {
      return { ...prevState, page: value };
    });
  };

  const handleSearchProduct = (value: string) => {
    setSearchOrder(value);
    debounceSearchListOrders(value.trim(), setParams);
  };

  useEffect(() => {
    dispatch(orderActions.getListOrders(params));
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
          placeholder="Tìm kiếm đơn hàng"
          // size="small"
          value={searchOrder}
          onChange={(e) => handleSearchProduct(e.target.value)}
        />
        <TextField
          sx={{ minWidth: "150px" }}
          // size="small"
          variant="outlined"
          select
          id="product-status"
          label="Trạng thái"
          value={orderStatusLabel}
          InputLabelProps={{ shrink: !!orderStatusLabel }}
          onChange={(e: any) => {
            if (e.target.value) {
              setParams((prevState) => ({
                ...prevState,
                status: e.target.value,
                page: 1,
              }));
            } else {
              setParams((prevState) => ({
                page_size: prevState.page_size,
                search: prevState.search,
                page: 1,
              }));
            }
            setProductStatus(e.target.value);
          }}
        >
          {listStatus.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </TextField>
        {/* <CustomButton
          Icon={<AddIcon />}
          color="primary"
          onClick={openAddMemberModal}
          label="Thêm thành viên"
        /> */}
      </Stack>
      <Stack sx={{ minHeight: "85vh" }} justifyContent="space-between">
        <OrdersTable />
        {/* {listProducts?.length ? ( */}
        <Stack sx={{ py: "20px" }}>
          <Pagination
            count={pagination ? totalPagePagination(pagination) : 1}
            page={pagination?.page || 1}
            onChange={handlePagination}
          />
        </Stack>
        {/* ) : (
        <></>
      )} */}
      </Stack>
    </>
  );
};

export default MemberPage;
