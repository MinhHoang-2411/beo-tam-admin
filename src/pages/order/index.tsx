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
    per_page: number;
    page: number;
    name?: string;
  }>({ per_page: 10, page: 1 });
  const [orderStatusLabel, setProductStatus] = useState("");
  const [listStatus] = useState([
    { label: "Đã hoàn thành", value: 1 },
    { label: "Thất bại", value: 2 },
    // { label: "Chưa yêu cầu", value: 3 },
    // { label: "Đã từ chối", value: 4 },
    // { label: "Chờ duyệt", value: 5 },
  ]);

  const debounceSearchListOrders = useCallback(debounceSearch, []);

  const handlePagination = (e: any, value: number) => {
    setParams((prevState) => {
      return { ...prevState, page: value };
    });
  };

  const handleSearchProduct = (value: string) => {
    setSearchOrder(value);
    // debounceSearchListOrders(value.trim(), setParams);
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
            // setParams((prevState) => ({
            //   ...prevState,
            //   status: e.target.value,
            //   page: 1,
            // }));
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
