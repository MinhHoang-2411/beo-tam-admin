import { useState, useEffect, useMemo } from "react";
import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Stack,
  SortDirection,
  Checkbox,
} from "@mui/material";
import OrderTableHead from "../../components/table/OrderTableHead";

// icon
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from "@mui/icons-material/Info";

// empty
import Empty from "../../components/table/Empty";
import noImage from "../../assets/emptyData/no-picture.png";
import { HeadCell } from "../../types/table";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { checkAllCondition, handleCheckAll } from "../../utils/table";
import { ParamsModalConfirm } from "../../types/modal";
import { modalActions } from "../../store/modal/modalSlice";
import LoadingPage from "../../components/LoadingPage";
import { Order } from "../../types/order";
import { convertDateWooCommerce } from "../../utils/convertDate";
import { Product } from "../../types/product";
import { convertNumberFormat } from "../../utils/numberFormat";
import { useNavigate } from "react-router-dom";
import ChipProductType from "../../components/Chip/ChipProduct";
import { productActions } from "../../store/product/productSlice";

export default function ProductsTable() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { listProducts, loadingGetListProducts } = useAppSelector(
    (state) => state.product
  );
  const [listStatusObject] = useState<any>({
    completed: "Đã hoàn thành",
    failed: "Thất bại",
    processing: "Đang triển khai",
  });
  const [listChecked, setListChecked] = useState<any[]>([]);
  const isCheckAll = useMemo(
    () => checkAllCondition(listProducts as any[], listChecked),
    [listProducts, listChecked]
  );
  const handleChecked = (e: any) => {
    const id = Number(e.target.value);
    const tmpList = [...listChecked];
    //check xem id đã tồn tại trong listChecked chưa, nếu có sẽ trả về giá trị >-1
    const index = tmpList.indexOf(id);
    //handle toggle selected
    if (index > -1) {
      tmpList.splice(index, 1);
    } else {
      tmpList.push(id);
    }
    setListChecked(tmpList);
  };
  const resetChecked = () => {
    setListChecked([]);
  };

  const [order] = useState("asc");
  const [orderBy] = useState("trackingNo");

  const confirmDelete = (data: Product) => {
    const params: ParamsModalConfirm = {
      title: "Xác nhận",
      content: <span>Bạn có chắc chắc muốn xóa sản phẩm này không ?</span>,
      onAction: () => {
        console.log({ data });
        dispatch(productActions.deleteProduct(data._id));
      },
      buttonText: "Xóa",
    };
    dispatch(modalActions.showModal(params));
  };

  const headCells: HeadCell[] = [
    {
      id: "checkbox",
      align: "left",
      disablePadding: false,
      label: "",
      width: "40px",
    },
    {
      id: "productId",
      align: "left",
      disablePadding: false,
      label: "ID",
      fontSize: "15px",
    },
    {
      id: "productName",
      align: "left",
      disablePadding: false,
      label: "Sản phẩm",
      fontSize: "15px",
    },
    {
      id: "price",
      align: "left",
      disablePadding: false,
      label: "Giá",
      fontSize: "15px",
    },
    // {
    //   id: "date",
    //   align: "left",
    //   disablePadding: false,
    //   label: "Ngày tạo",
    //   fontSize: "15px",
    // },
    {
      id: "status",
      align: "center",
      disablePadding: false,
      label: "Trạng thái",
      fontSize: "15px",
    },
    {
      id: "action",
      align: "center",
      disablePadding: false,
      label: "Hành động",
      fontSize: "15px",
      paddingLeft: "25px",
    },
  ];

  function Row({ row }: { row: Product }) {
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row" align="left">
            <Checkbox
              color="secondary"
              value={row?._id}
              checked={listChecked?.includes(row?._id)}
              onChange={handleChecked}
            />
          </TableCell>

          <TableCell
            align="left"
            className="table-cell"
            onClick={() => {
              navigate(`/products/${row._id}`);
            }}
            sx={{
              minWidth: 100,
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
              "&:hover": {
                color: "#52A186",
                fontWeight: 700,
              },
              cursor: "pointer",
            }}
          >
            {row.woo_product_id}
          </TableCell>

          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 150,
              maxWidth: 280,
              overflow: "hidden",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <img
                style={{ width: "70px", height: "50px", objectFit: "contain" }}
                src={row.images[0]?.src || noImage}
                alt={row.images[0]?.alt || "no-img"}
              />
              <p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                {row.name}
              </p>
            </Stack>
          </TableCell>

          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 90,
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {`${convertNumberFormat(row.price)}đ`}
          </TableCell>
          {/* <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 150,
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {convertDateWooCommerce(row.date_created_gmt)}
          </TableCell> */}
          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 100,
              maxWidth: 120,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <ChipProductType type={row.status} />
          </TableCell>
          <TableCell align="left" className="table-cell">
            <Box>
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton
                  sx={{ marginLeft: "0px" }}
                  aria-label="delete"
                  onClick={(e) => {
                    confirmDelete(row);
                  }}
                  color="error"
                >
                  <CancelIcon fontSize="medium" />
                </IconButton>
                <IconButton
                  sx={{ marginLeft: "0px" }}
                  aria-label="info"
                  onClick={(e) => {
                    // dispatch(orderActions.chooseOrderDetail(row));
                    navigate(`/products/${row._id}`);
                  }}
                  color="primary"
                >
                  <InfoIcon fontSize="medium" />
                </IconButton>
              </Stack>
            </Box>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  useEffect(() => {
    resetChecked();
  }, [listProducts]);

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead
            headCells={headCells}
            order={order as SortDirection | undefined}
            orderBy={orderBy}
            checked={isCheckAll}
            handleCheckAll={() =>
              handleCheckAll(listProducts as any[], listChecked, setListChecked)
            }
          />

          {loadingGetListProducts || !listProducts ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={12} scope="full" align="center">
                  <LoadingPage />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : listProducts?.length ? (
            <TableBody>
              {listProducts.map((item, index) => (
                <Row key={index} row={item} />
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={12} scope="full" align="center">
                  <Empty title="Không có dữ liệu" height="400px" />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
