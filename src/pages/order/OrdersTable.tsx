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
import InfoIcon from "@mui/icons-material/Info";

// icon
import CancelIcon from "@mui/icons-material/Cancel";

// empty
import Empty from "../../components/table/Empty";
import { HeadCell } from "../../types/table";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { checkAllCondition, handleCheckAll } from "../../utils/table";
import { ParamsModalConfirm } from "../../types/modal";
import { modalActions } from "../../store/modal/modalSlice";
import LoadingPage from "../../components/LoadingPage";
import { Order } from "../../types/order";
import { convertDateWooCommerce } from "../../utils/convertDate";
import { orderActions } from "../../store/order/orderSlice";
import { useNavigate } from "react-router-dom";
import { convertNumberFormat } from "../../utils/numberFormat";

export default function OrdersTable() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { listOrders, loadingGetListOrders } = useAppSelector(
    (state) => state.order
  );
  const [listStatusObject] = useState<any>({
    pending: "Đang xử lý",
    processing: "Chờ thanh toán",
    "on-hold": "Tạm giữ",
    completed: "Đã hoàn thành",
    cancelled: "Đã hủy",
    refunded: "Đã hoàn lại tiền",
    failed: "Thất bại",
    Draft: "Đã xóa",
  });
  const [listChecked, setListChecked] = useState<any[]>([]);
  const isCheckAll = useMemo(
    () => checkAllCondition(listOrders as any[], listChecked),
    [listOrders, listChecked]
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

  const confirmDelete = (data: Order) => {
    const params: ParamsModalConfirm = {
      title: "Xác nhận",
      content: <span>Bạn có chắc chắc muốn xóa đơn hàng này không ?</span>,
      onAction: () => {
        console.log("yolo");
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
      id: "orderId",
      align: "left",
      disablePadding: false,
      label: "Đơn hàng",
      fontSize: "15px",
    },
    {
      id: "customer",
      align: "left",
      disablePadding: false,
      label: "Khách hàng",
      fontSize: "15px",
    },

    {
      id: "status",
      align: "left",
      disablePadding: false,
      label: "Trạng thái",
      fontSize: "15px",
    },
    {
      id: "date",
      align: "left",
      disablePadding: false,
      label: "Ngày tạo",
      fontSize: "15px",
    },
    {
      id: "payment-method",
      align: "left",
      disablePadding: false,
      label: "Phương thức thanh toán",
      fontSize: "15px",
    },
    {
      id: "total",
      align: "left",
      disablePadding: false,
      label: "Tổng tiền",
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

  function Row({ row }: { row: Order }) {
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
          <TableCell align="left" className="table-cell">
            {row._id}
          </TableCell>
          <TableCell
            sx={{
              minWidth: 150,
              maxWidth: 150,
              overflow: "hidden",
              textOverflow: "ellipsis",
              "&:hover": {
                color: "#52A186",
                fontWeight: 700,
              },
              cursor: "pointer",
            }}
            align="left"
            className="table-cell"
            onClick={() => {
              navigate(`/customer/${row.customer._id}`);
            }}
          >
            {`${row.customer.first_name} ${row.customer.last_name}`}
          </TableCell>

          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 150,
              maxWidth: 150,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.status}
          </TableCell>
          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 150,
              maxWidth: 150,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {convertDateWooCommerce(row.date_created)}
          </TableCell>
          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 150,
              maxWidth: 150,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.payment_method_title}
          </TableCell>
          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 100,
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {`${convertNumberFormat(row.total)}đ`}
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
                    navigate(`/orders/${row._id}`);
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
  }, [listOrders]);

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
              handleCheckAll(listOrders as any[], listChecked, setListChecked)
            }
          />

          {loadingGetListOrders || !listOrders ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={12} scope="full" align="center">
                  <LoadingPage />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : listOrders?.length ? (
            <TableBody>
              {listOrders.map((item, index) => (
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
