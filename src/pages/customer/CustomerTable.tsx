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
import { DetailCustomer } from "../../types/user";
import { userActions } from "../../store/user/userSlice";
import { layoutActions } from "../../store/layout/layoutSlice";
import history from "../../routes/history";

export default function CustomerTable() {
  const dispatch = useAppDispatch();
  const { listCustomer, loadingGetListCustomer } = useAppSelector(
    (state) => state.user
  );
  const [listChecked, setListChecked] = useState<any[]>([]);
  const isCheckAll = useMemo(
    () => checkAllCondition(listCustomer as any[], listChecked),
    [listCustomer, listChecked]
  );
  const handleChecked = (e: any) => {
    const id = e.target.value;
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
    console.log({ tmpList });
  };
  const resetChecked = () => {
    setListChecked([]);
  };

  const confirmDelete = (data: DetailCustomer) => {
    const params: ParamsModalConfirm = {
      title: "Xác nhận",
      content: <span>Bạn có chắc chắc muốn xóa thành viên này không ?</span>,
      onAction: () => {
        dispatch(userActions.deleteCustomer(data._id));
        // console.log({ data });
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
      id: "customerId",
      align: "left",
      disablePadding: false,
      label: "ID",
      fontSize: "15px",
    },
     {
      id: "customerUserName",
      align: "left",
      disablePadding: false,
      label: "Tên đăng nhập",
      fontSize: "15px",
    },
    {
      id: "customerName",
      align: "left",
      disablePadding: false,
      label: "Tên thành viên",
      fontSize: "15px",
    },
    {
      id: "email",
      align: "left",
      disablePadding: false,
      label: "Email",
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

  function Row({ row }: { row: DetailCustomer }) {
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
            <a
              href={`/customer/${row._id}`}
              style={{
                textDecoration: "underline",
                color: "#0076CE",
              }}
            >
              {row.woo_user_id}
            </a>
          </TableCell>

          <TableCell align="left" className="table-cell">
            <a
              href={`/customer/${row._id}`}
              style={{
                color: "#0076CE",
              }}
            >
              {row.username}
            </a>
          </TableCell>

          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 150,
              maxWidth: 250,
              overflow: "hidden",
              "&:hover": {
                color: "#52A186",
                fontWeight: 700,
              },
              cursor: "pointer",
            }}
          >
            {(row.first_name || row.last_name) ? `${row.first_name} ${row.last_name}` : 'Chưa cập nhật'}
          </TableCell>

          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 90,
              maxWidth: 150,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.email}
          </TableCell>
          <TableCell align="left" className="table-cell">
            <Box>
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton
                  aria-label="edit"
                  onClick={(e) => {
                    history.push(`/customer/${row._id}`);
                  }}
                  color="primary"
                >
                  <InfoIcon fontSize="medium" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={(e) => {
                    confirmDelete(row);
                  }}
                  color="error"
                >
                  <CancelIcon fontSize="medium" />
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
  }, [listCustomer]);

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
            checked={isCheckAll}
            handleCheckAll={() =>
              handleCheckAll(listCustomer as any[], listChecked, setListChecked)
            }
          />

          {loadingGetListCustomer || !listCustomer ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={12} scope="full" align="center">
                  <LoadingPage />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : listCustomer?.length ? (
            <TableBody>
              {listCustomer.map((item, index) => (
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
