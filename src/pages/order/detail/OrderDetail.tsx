import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { orderActions } from "../../../store/order/orderSlice";
import {
  Box,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { convertDateWooCommerce } from "../../../utils/convertDate";
import { Product, ShippingLine } from "../../../types/order";
import { HeadCell } from "../../../types/table";
import OrderTableHead from "../../../components/table/OrderTableHead";
import deliveryImg from "../../../assets/delivery.png";
const OrderDetail = () => {
  const dispatch = useAppDispatch();
  const orderDetail = useAppSelector((state) => state.order.OrderDetail);
  useEffect(() => {
    return () => {
      dispatch(orderActions.resetOrderDetail);
    };
  }, []);

  const headCells: HeadCell[] = [
    {
      id: "product",
      align: "left",
      disablePadding: false,
      label: "Sản phẩm",
      fontSize: "15px",
    },
    {
      id: "price",
      align: "center",
      disablePadding: false,
      label: "Chi phí",
      fontSize: "15px",
    },
    {
      id: "quantity",
      align: "center",
      disablePadding: false,
      label: "Số lượng",
      fontSize: "15px",
    },
    {
      id: "total",
      align: "center",
      disablePadding: false,
      label: "Tổng tiền",
      fontSize: "15px",
    },
  ];

  function RowProduct({ row }: { row: Product }) {
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 400,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <img
                src={row.image.src}
                alt={row.image.id}
                style={{ width: "70px" }}
              />
              <Stack>
                <p>{row.name}</p>
                <p>Mã: {row.sku}</p>
              </Stack>
            </Stack>
          </TableCell>
          <TableCell
            align="center"
            className="table-cell"
            sx={{
              minWidth: 100,
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.price}
          </TableCell>
          <TableCell
            align="center"
            className="table-cell"
            sx={{
              minWidth: 100,
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            x {row.quantity}
          </TableCell>
          <TableCell
            sx={{
              minWidth: 100,
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            align="center"
            className="table-cell"
          >
            {row.total}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  function RowShipping({ row }: { row: ShippingLine }) {
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 400,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <img src={deliveryImg} alt="ship-img" style={{ width: "70px" }} />
              <Stack>
                <p>{row.method_title}</p>
                {row.meta_data.map((item) => (
                  <p>
                    {item.display_key}: {item.display_value}
                  </p>
                ))}
              </Stack>
            </Stack>
          </TableCell>
          <TableCell
            align="center"
            className="table-cell"
            sx={{
              minWidth: 100,
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          ></TableCell>
          <TableCell
            align="center"
            className="table-cell"
            sx={{
              minWidth: 100,
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          ></TableCell>
          <TableCell
            sx={{
              minWidth: 100,
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            align="center"
            className="table-cell"
          >
            {row.total}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: "4px" }}>
        <Typography
          fontWeight={700}
          variant="h3"
        >{`Đặt hàng #${orderDetail?.id} chi tiết`}</Typography>
        <Typography
          variant="h5"
          sx={{ color: "#606060" }}
        >{`Phương thức thanh toán: ${orderDetail?.payment_method_title}`}</Typography>
        <Grid container>
          <Grid item xs={4} sx={{ mt: 1 }}>
            <Typography variant="h6" fontWeight={700}>
              Chung
            </Typography>
            <Typography variant="h6" fontWeight={600} sx={{ color: "#606060" }}>
              Ngày tạo:{" "}
            </Typography>
            <p>{convertDateWooCommerce(orderDetail?.date_created_gmt)}</p>

            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ color: "#606060", mt: 1 }}
            >
              Trạng thái:{" "}
            </Typography>
            <p style={{ color: "#000" }}>{orderDetail?.status}</p>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ color: "#606060", mt: 1 }}
            >
              Khách hàng:{" "}
            </Typography>
            <p
              style={{ color: "#000" }}
            >{`${orderDetail?.billing.first_name} ${orderDetail?.billing.last_name}(${orderDetail?.billing.email})`}</p>
          </Grid>

          <Grid item xs={4} sx={{ mt: 1 }}>
            <Typography variant="h6" fontWeight={700}>
              Thanh toán
            </Typography>
            <Typography variant="h6" sx={{ color: "#606060" }}>
              {`${orderDetail?.billing.first_name} ${orderDetail?.billing.last_name}`}
            </Typography>
            {orderDetail?.billing.address_1 ? (
              <Typography variant="h6" sx={{ color: "#606060" }}>
                {`${orderDetail?.billing.address_1}`}
              </Typography>
            ) : (
              <></>
            )}
            {orderDetail?.billing.address_2 ? (
              <Typography variant="h6" sx={{ color: "#606060" }}>
                {`${orderDetail?.billing.address_2}`}
              </Typography>
            ) : (
              <></>
            )}
            {orderDetail?.billing.city ? (
              <Typography variant="h6" sx={{ color: "#606060" }}>
                {`${orderDetail?.billing.city}`}
              </Typography>
            ) : (
              <></>
            )}
            {orderDetail?.billing.email ? (
              <>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ color: "#606060" }}
                >
                  Địa chỉ email:
                </Typography>
                <p
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                >
                  {orderDetail?.billing.email}
                </p>
              </>
            ) : (
              <></>
            )}
            {orderDetail?.billing.phone ? (
              <>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ color: "#606060" }}
                >
                  Số điện thoại:
                </Typography>
                <p
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                >
                  {orderDetail?.billing.phone}
                </p>
              </>
            ) : (
              <></>
            )}
          </Grid>

          <Grid item xs={4} sx={{ mt: 1 }}>
            <Typography variant="h6" fontWeight={700}>
              Giao hàng
            </Typography>
            <Typography variant="h6" sx={{ color: "#606060" }}>
              {`${orderDetail?.shipping.first_name} ${orderDetail?.shipping.last_name}`}
            </Typography>
            {orderDetail?.billing.address_1 ? (
              <Typography variant="h6" sx={{ color: "#606060" }}>
                {`${orderDetail?.shipping.address_1}`}
              </Typography>
            ) : (
              <></>
            )}
            {orderDetail?.billing.address_2 ? (
              <Typography variant="h6" sx={{ color: "#606060" }}>
                {`${orderDetail?.shipping.address_2}`}
              </Typography>
            ) : (
              <></>
            )}
            {orderDetail?.billing.city ? (
              <Typography variant="h6" sx={{ color: "#606060" }}>
                {`${orderDetail?.shipping.city}`}
              </Typography>
            ) : (
              <></>
            )}
            {orderDetail?.shipping?.email ? (
              <>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ color: "#606060" }}
                >
                  Địa chỉ email:
                </Typography>
                <p
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                >
                  {orderDetail?.shipping.email}
                </p>
              </>
            ) : (
              <></>
            )}
            {orderDetail?.shipping.phone ? (
              <>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ color: "#606060" }}
                >
                  Số điện thoại:
                </Typography>
                <p
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                >
                  {orderDetail?.shipping.phone}
                </p>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 2, border: "1px solid #ccc", borderRadius: "4px" }}>
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
            <OrderTableHead headCells={headCells} />
            <TableBody>
              {orderDetail?.line_items.map((item, index) => (
                <RowProduct key={index} row={item} />
              ))}
              {orderDetail?.shipping_lines.map((item, index) => (
                <RowShipping key={index} row={item} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack alignItems="flex-end" sx={{ px: 8, py: 1 }}>
          <Stack direction="row" spacing={10} justifyContent="space-between">
            <p>Tạm tính:</p>
            <b>{orderDetail?.total}</b>
          </Stack>
          <Stack direction="row" spacing={10} justifyContent="space-between">
            <p>Giao nhận hàng:</p>
            <b>{orderDetail?.shipping_total}</b>
          </Stack>
          <Stack direction="row" spacing={10} justifyContent="space-between">
            <p>Thành tiền:</p>
            <b>
              {Number(orderDetail?.shipping_total) + Number(orderDetail?.total)}
            </b>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderDetail;