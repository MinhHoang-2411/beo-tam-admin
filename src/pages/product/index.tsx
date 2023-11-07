import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import ProductsTable from "./ProductsTable";
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
import { productActions } from "../../store/product/productSlice";

const MemberPage = () => {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector((state) => state.product.pagination);
  const [searchProduct, setSearchProduct] = useState("");
  const [params, setParams] = useState<{
    page_size: number;
    page: number;
    name?: string;
  }>({ page_size: 10, page: 1 });
  const [productStatusLabel, setProductStatus] = useState("");
  const [listStatus] = useState([
    { label: "Đã hoàn thành", value: 1 },
    { label: "Thất bại", value: 2 },
    { label: "Đang triển khai", value: 3 },
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
    setSearchProduct(value);
    // debounceSearchListOrders(value.trim(), setParams);
  };

  useEffect(() => {
    dispatch(productActions.getListProducts(params));
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
          placeholder="Tìm kiếm sản phẩm"
          // size="small"
          value={searchProduct}
          onChange={(e) => handleSearchProduct(e.target.value)}
        />
        <TextField
          sx={{ minWidth: "150px" }}
          // size="small"
          variant="outlined"
          select
          id="product-status"
          label="Trạng thái"
          value={productStatusLabel}
          InputLabelProps={{ shrink: !!productStatusLabel }}
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
        <ProductsTable />
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
