import { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import {
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import { ParamsModalConfirm } from "../../../types/modal";
import { ItemLine, Product } from "../../../types/order";
import { modalActions } from "../../../store/modal/modalSlice";
import { HeadCell } from "../../../types/table";
import React from "react";
import { convertNumberFormat } from "../../../utils/numberFormat";
import OrderTableHead from "../../../components/table/OrderTableHead";
import CustomButton from "../../../components/share/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { productActions } from "../../../store/product/productSlice";
import noImage from "../../../assets/emptyData/no-picture.png";
import { userActions } from "../../../store/user/userSlice";
import { DetailCustomer } from "../../../types/user";
import { orderActions } from "../../../store/order/orderSlice";
import { set } from "lodash";

interface FieldValues {
  woo_customer_id: number;
  payment_method: string;
  payment_method_title?: string;
  // set_paid: true;
  billing?: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping?: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  line_items?: {
    product_id: number;
    quantity: number;
    price: any;
  }[];
  shipping_lines?: {
    method_id: string;
    method_title: string;
    total: string;
  }[];
  fee_lines?: {
    name: string;
    total: string;
  }[];
}

const EditOrder = ({ closeEdit }: { closeEdit: () => void }) => {
  const dispatch = useAppDispatch();
  const orderDetail = useAppSelector((state) => state.order.OrderDetail);
  const loadingGetListProducts = useAppSelector(
    (state) => state.product.loadingGetListProducts
  );
  const [customerInputValue, setCustomerInputValue] = useState<string>("");
  const [allowChangeCustomerInput, setAllowChangeCustomerInput] =
    useState<boolean>(false);
  const [listPaymentMethod] = useState([
    {
      label: "Chuyển khoản ngân hàng",
      value: {
        paymentMethod: "bacs",
        paymentMethodTitle: "Chuyển khoản ngân hàng",
      },
    },
    {
      label: "Thanh toán nhận hàng",
      value: {
        paymentMethod: "cod",
        paymentMethodTitle: "Thanh toán nhận hàng",
      },
    },
    {
      label: "Quét mã momo",
      value: {
        paymentMethod: "momo_qr_scan",
        paymentMethodTitle: "Quét mã momo",
      },
    },
  ]);

  const [listShippings] = useState([
    {
      label: "Đồng giá",
      value: {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "15000",
      },
    },
    {
      label: "Miễn phí vận chuyển",
      value: {
        method_id: "free_shipping",
        method_title: "Free Shipping",
        total: "0",
      },
    },
  ]);
  const [paymentMethodLabel, setPaymentMethodLabel] = useState("");
  const [listProduct, setListProducts] = useState<Product[]>([]);
  const [customerInput, setCustomerInput] = useState<DetailCustomer | null>(
    null
  );
  const [openSelectProduct, setOpenSelectProduct] = useState<boolean>(false);
  const [openSelectShipping, setOpenSelectShipping] = useState<boolean>(false);
  const [openAddFee, setOpenAddFee] = useState<boolean>(false);
  const [feeName, setFeeName] = useState("");
  const [feeTotal, setFeeTotal] = useState("");
  const [shippingLines, setShippingLines] = useState<
    {
      method_id: string;
      method_title: string;
      total: string;
    }[]
  >([]);
  const [feeLines, setFeeLines] = useState<
    {
      name: string;
      total: string;
    }[]
  >([]);
  const [shippingLine, setShippingLine] = useState<string>("");

  const listAllProductsInStore = useAppSelector(
    (state) => state.product.listProducts
  );
  const listAllCustomerInStore = useAppSelector(
    (state) => state.user.listCustomer
  );
  const [listAllProducts, setListAllProducts] = useState<Product[] | null>(
    null
  );
  const headCellsEdit: HeadCell[] = [
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
      label: "Giá",
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
    {
      id: "delete",
      align: "center",
      disablePadding: false,
      label: "Hành động",
      fontSize: "15px",
    },
  ];

  const confirmDelete = (data: Product) => {
    const params: ParamsModalConfirm = {
      title: "Xác nhận",
      content: <span>Bạn có chắc chắc muốn xóa sản phẩm này không ?</span>,
      onAction: () => {
        setListProducts((prev) => prev.filter((prod) => prod._id !== data._id));
        console.log(listProduct);
      },
      buttonText: "Xóa",
    };
    dispatch(modalActions.showModal(params));
  };

  const confirmDeleteShipping = (
    data: {
      method_id: string;
      method_title: string;
      total: string;
    },
    index: number
  ) => {
    const params: ParamsModalConfirm = {
      title: "Xác nhận",
      content: <span>Bạn có chắc chắc muốn xóa vận chuyển này không ?</span>,
      onAction: () => {
        setShippingLines((prev) => {
          const newV = [...prev];
          newV.splice(index, 1);
          return newV;
        });
      },
      buttonText: "Xóa",
    };
    dispatch(modalActions.showModal(params));
  };

  const confirmDeleteFee = (
    data: {
      name: string;
      total: string;
    },
    index: number
  ) => {
    const params: ParamsModalConfirm = {
      title: "Xác nhận",
      content: <span>Bạn có chắc chắc muốn xóa phí này không ?</span>,
      onAction: () => {
        setFeeLines((prev) => {
          const newV = [...prev];
          newV.splice(index, 1);
          return newV;
        });
      },
      buttonText: "Xóa",
    };
    dispatch(modalActions.showModal(params));
  };

  //handle crud products, shipping, fee
  const handleChooseProduct = () => {
    setOpenSelectProduct(true);
    console.log({ feeLines, shippingLines });
  };
  const handleCloseOpenProduct = () => {
    setOpenSelectProduct(false);
  };

  const handleOpenAddShipping = () => {
    setOpenSelectShipping(true);
  };
  const handleCloseAddShipping = () => {
    setOpenSelectShipping(false);
    setShippingLine("");
  };
  const handleAgreeAddShipping = () => {
    setShippingLines((prev) => {
      const newLine = JSON.parse(shippingLine);
      return [...prev, newLine];
    });
    handleCloseAddShipping();
  };

  const handleOpenAddFee = () => {
    setOpenAddFee(true);
  };
  const handleCloseAddFee = () => {
    setOpenAddFee(false);
    setFeeName("");
    setFeeTotal("");
  };
  const handleAgreeAddFee = () => {
    setFeeLines((prev) => [
      ...prev,
      {
        name: feeName,
        total: feeTotal.toString(),
      },
    ]);
    handleCloseAddFee();
  };
  const onSubmit: SubmitHandler<FieldValues> = (payloadForm) => {
    console.log({ payloadForm });
    const data = {
      woo_order_id: orderDetail?.woo_order_id,
      woo_customer_id: payloadForm.woo_customer_id,
      payment_method: JSON.parse(payloadForm.payment_method).paymentMethod,
      payment_method_title: JSON.parse(payloadForm.payment_method)
        .paymentMethodTitle,
      total: (
        Number(shipFee) +
        Number(customFee) +
        Number(prodsPrice)
      ).toString(),
      detail: {
        billing: payloadForm.billing,
        shipping: payloadForm.shipping,
        line_items: listProduct.map((prod, index) => ({
          product_id: prod.woo_product_id,
          quantity: payloadForm.line_items
            ? payloadForm.line_items[index].quantity
            : 1,
          price: prod.price,
          name: prod.name,
          subtotal: "",
          sku: prod.sku,
          image: { id: prod.images[0].id, src: prod.images[0].src },
        })),
        shipping_lines: shippingLines,
        fee_lines: feeLines,
        coupon_lines: [],
        meta_data: [],
      },
    };
    console.log({ data });
    const payload = {
      data,
      onNext() {
        reset();
        setListProducts([]);
        setFeeLines([]);
        setShippingLines([]);
        setPaymentMethodLabel("");
        setCustomerInput(null);
        closeEdit();
      },
      id: orderDetail?._id,
    };
    dispatch(orderActions.editOrder(payload));
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      woo_customer_id: NaN,
      payment_method: "",
      billing: {
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
        email: "",
        phone: "",
      },
      shipping: {
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
      },
      line_items: [],
      shipping_lines: [],
      fee_lines: [],
    },
    resolver: yupResolver(
      yup.object().shape({
        woo_customer_id: yup.number().required("Vui lòng nhập trường này"),
        payment_method: yup.string().required("Vui lòng nhập trường này"),
      })
    ),
  });
  const lineItem = watch("line_items");

  function RowEditProduct({ row, index }: { row: Product; index: number }) {
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
                src={row?.images[0]?.src || noImage}
                alt={row?.images[0]?.id || "no-img"}
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
            {convertNumberFormat(row.price.toString())}
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
            <TextField
              type="number"
              id="quantity"
              inputProps={{ ...register(`line_items.${index}.quantity`) }}
            />
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
            {lineItem?.length
              ? convertNumberFormat(
                  (
                    (Number(row.price) * lineItem[index].quantity) as number
                  ).toString()
                )
              : ""}
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
            <IconButton
              sx={{ marginLeft: "0px" }}
              aria-label="delete"
              onClick={(e) => {
                confirmDelete(row);
                console.log({ lineItem });
              }}
              color="error"
            >
              <CancelIcon fontSize="medium" />
            </IconButton>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  function RowShipping({
    row,
    index,
  }: {
    row: {
      method_id: string;
      method_title: string;
      total: string;
    };
    index: number;
  }) {
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
              <img src={noImage} alt={"no-img"} style={{ width: "70px" }} />
              <Stack>
                <p>{row.method_title}</p>
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
            {convertNumberFormat(row.total)}
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
            <IconButton
              sx={{ marginLeft: "0px" }}
              aria-label="delete"
              onClick={(e) => {
                confirmDeleteShipping(row, index);
              }}
              color="error"
            >
              <CancelIcon fontSize="medium" />
            </IconButton>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  function RowFee({
    row,
    index,
  }: {
    row: {
      name: string;
      total: string;
    };
    index: number;
  }) {
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
              <img src={noImage} alt={"no-img"} style={{ width: "70px" }} />
              <Stack>
                <p>{row.name}</p>
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
            {convertNumberFormat(row.total)}
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
            <IconButton
              sx={{ marginLeft: "0px" }}
              aria-label="delete"
              onClick={(e) => {
                confirmDeleteFee(row, index);
              }}
              color="error"
            >
              <CancelIcon fontSize="medium" />
            </IconButton>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const prodsPrice = useMemo(() => {
    return listProduct.reduce(
      (accumulator: number, cv, index) =>
        accumulator +
        Number(cv.price) *
          (lineItem?.length ? Number(lineItem[index].quantity) : 1),
      0
    );
  }, [JSON.stringify(lineItem), listProduct]);

  const shipFee = useMemo(() => {
    return shippingLines.reduce(
      (accumulator: number, cv) => accumulator + Number(cv.total),
      0
    );
  }, [shippingLines]);

  const customFee = useMemo(() => {
    return feeLines.reduce(
      (accumulator: number, cv) => accumulator + Number(cv.total),
      0
    );
  }, [feeLines]);

  useEffect(
    () => setListAllProducts(listAllProductsInStore as unknown as Product[]),
    [listAllProductsInStore]
  );

  useEffect(() => {
    dispatch(productActions.getListProducts({}));
    dispatch(userActions.getListCustomer());
  }, []);

  useEffect(() => {
    console.log({ orderDetail });
    setValue(
      "woo_customer_id",
      orderDetail?.woo_customer_id ? Number(orderDetail.woo_customer_id) : NaN
    );
    setCustomerInputValue(
      `${orderDetail?.customer.first_name as string} ${
        orderDetail?.customer.last_name as string
      }(${orderDetail?.customer.email})`
    );
    setPaymentMethodLabel(
      orderDetail?.payment_method_title
        ? JSON.stringify(
            listPaymentMethod.find(
              (value) => value.label === orderDetail.payment_method_title
            )?.value
          )
        : ""
    );
    setValue(
      "payment_method",
      orderDetail?.payment_method_title
        ? JSON.stringify(
            listPaymentMethod.find(
              (value) => value.label === orderDetail.payment_method_title
            )?.value
          )
        : ""
    );
    setValue(
      "billing.address_1",
      orderDetail?.detail.billing.address_1 as string
    );
    setValue(
      "billing.address_2",
      orderDetail?.detail.billing.address_2 as string
    );
    setValue(
      "billing.first_name",
      orderDetail?.detail.billing.first_name as string
    );
    setValue(
      "billing.last_name",
      orderDetail?.detail.billing.last_name as string
    );
    setValue("billing.city", orderDetail?.detail.billing.city as string);
    setValue("billing.state", orderDetail?.detail.billing.state as string);
    setValue(
      "billing.postcode",
      orderDetail?.detail.billing.postcode as string
    );
    setValue("billing.country", orderDetail?.detail.billing.country as string);
    setValue("billing.email", orderDetail?.detail.billing.email as string);
    setValue("billing.phone", orderDetail?.detail.billing.phone as string);
    setValue(
      "shipping.first_name",
      orderDetail?.detail.shipping.first_name as string
    );
    setValue(
      "shipping.last_name",
      orderDetail?.detail.shipping.last_name as string
    );
    setValue(
      "shipping.address_1",
      orderDetail?.detail.shipping.address_1 as string
    );
    setValue(
      "shipping.address_2",
      orderDetail?.detail.shipping.address_2 as string
    );
    setValue("shipping.city", orderDetail?.detail.shipping.city as string);
    setValue("shipping.state", orderDetail?.detail.shipping.state as string);
    setValue(
      "shipping.postcode",
      orderDetail?.detail.shipping.postcode as string
    );
    setValue(
      "shipping.country",
      orderDetail?.detail.shipping.country as string
    );
    setListProducts(
      orderDetail?.detail.line_items.map((cv) => ({
        ...cv,
        images: [cv.image],
        _id: cv.id,
        woo_product_id: cv.id,
      })) as Product[]
    );
    orderDetail?.detail.line_items.forEach((cv, i) => {
      setValue(`line_items.${i}.quantity`, cv.quantity);
    });
    setShippingLines(
      orderDetail?.detail.shipping_lines as {
        method_id: string;
        method_title: string;
        total: string;
      }[]
    );
    setFeeLines(
      orderDetail?.detail.fee_lines as {
        name: string;
        total: string;
      }[]
    );
  }, [orderDetail]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h2" sx={{ fontWeight: 700 }}>
          Chỉnh sửa đơn hàng
        </Typography>
        <CustomButton color="error" label="Hủy" onClick={closeEdit} />
      </Stack>

      <Stack
        direction="row"
        sx={{ p: 2, border: "1px solid #ccc", borderRadius: 1, mt: 2 }}
        spacing={1}
      >
        <Stack flex={1} spacing={1}>
          <Typography variant="h4"> Thông tin chung</Typography>
          <Autocomplete
            onFocus={() => {
              setAllowChangeCustomerInput(true);
            }}
            inputValue={customerInputValue}
            onInputChange={(e, newValue) => {
              if (allowChangeCustomerInput) {
                setCustomerInputValue(newValue);
                console.log("wtf???");
              } else {
                console.log("đéo");
              }
            }}
            disablePortal
            id="combo-box-demo"
            options={
              listAllCustomerInStore as unknown as readonly DetailCustomer[]
            }
            getOptionLabel={(option) =>
              `${option.first_name} ${option.last_name}(${option.email})`
            }
            renderInput={(params) => (
              <TextField {...params} fullWidth label="Khách hàng" />
            )}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {`${option.first_name} ${option.last_name}(${option.email})`}
              </Box>
            )}
            onChange={(event: any, newValue) => {
              console.log(newValue);
              setValue("woo_customer_id", Number(newValue?.woo_user_id));
              setCustomerInput(newValue);
            }}
            value={customerInput}
          />
          <TextField
            sx={{ minWidth: "150px" }}
            // size="small"
            variant="outlined"
            select
            id="product-status"
            label="Phương thức thanh toán"
            value={paymentMethodLabel}
            // InputLabelProps={{ shrink: !!orderStatusLabel }}
            onChange={(e: any) => {
              console.log(e.target.value);
              setPaymentMethodLabel(e.target.value);
              setValue("payment_method", e.target.value);
            }}
          >
            {listPaymentMethod.map((status) => (
              <MenuItem key={status.label} value={JSON.stringify(status.value)}>
                {status.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <Stack flex={1} spacing={1}>
          <Typography variant="h4"> Thông tin thanh toán</Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              sx={{ width: "50%" }}
              id="payment_first_name"
              label="Họ"
              inputProps={{ ...register("billing.first_name") }}
            />
            <TextField
              sx={{ width: "50%" }}
              id="payment_last_name"
              label="Tên"
              inputProps={{ ...register("billing.last_name") }}
            />
          </Stack>
          <TextField
            id="payment_address1"
            label="Địa chỉ 1"
            inputProps={{ ...register("billing.address_1") }}
          />
          <TextField
            id="payment_address2"
            label="Địa chỉ 2"
            inputProps={{ ...register("billing.address_2") }}
          />
          <Stack direction="row" spacing={1}>
            <TextField
              sx={{ width: "50%" }}
              id="payment_city"
              label="Thành phố"
              inputProps={{ ...register("billing.city") }}
            />
            <TextField
              sx={{ width: "50%" }}
              id="payment_state"
              label="Tỉnh"
              inputProps={{ ...register("billing.state") }}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <TextField
              sx={{ width: "50%" }}
              id="payment_postcode"
              label="Mã bưu điện"
              inputProps={{ ...register("billing.postcode") }}
            />
            <TextField
              sx={{ width: "50%" }}
              id="payment_country"
              label="Quốc gia"
              inputProps={{ ...register("billing.country") }}
            />
          </Stack>

          <Stack direction="row" spacing={1}>
            <TextField
              sx={{ width: "50%" }}
              id="payment_email"
              label="Email"
              inputProps={{ ...register("billing.email") }}
            />
            <TextField
              sx={{ width: "50%" }}
              id="payment_phone"
              label="Điện thoại"
              inputProps={{ ...register("billing.phone") }}
            />
          </Stack>
        </Stack>
        <Stack flex={1} spacing={1}>
          <Typography variant="h4"> Thông tin giao hàng</Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              sx={{ width: "50%" }}
              id="shipping_first_name"
              label="Họ"
              inputProps={{ ...register("shipping.first_name") }}
            />
            <TextField
              sx={{ width: "50%" }}
              id="shipping_last_name"
              label="Tên"
              inputProps={{ ...register("shipping.last_name") }}
            />
          </Stack>
          <TextField
            id="shipping_address1"
            label="Địa chỉ 1"
            inputProps={{ ...register("shipping.address_1") }}
          />
          <TextField
            id="shipping_address2"
            label="Địa chỉ 2"
            inputProps={{ ...register("shipping.address_2") }}
          />
          <Stack direction="row" spacing={1}>
            <TextField
              sx={{ width: "50%" }}
              id="shipping_city"
              label="Thành phố"
              inputProps={{ ...register("shipping.city") }}
            />
            <TextField
              sx={{ width: "50%" }}
              id="shipping_state"
              label="Tỉnh"
              inputProps={{ ...register("shipping.state") }}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <TextField
              sx={{ width: "50%" }}
              id="shipping_postcode"
              label="Mã bưu điện"
              inputProps={{ ...register("shipping.postcode") }}
            />
            <TextField
              sx={{ width: "50%" }}
              id="shipping_country"
              label="Quốc gia"
              inputProps={{ ...register("shipping.country") }}
            />
          </Stack>

          {/* <TextField
            multiline
            rows={3}
            id="shipping_note"
            label="Ghi chú của khách hàng"
            inputProps={{ ...register("shipping.note") }}
          />
          <TextField
            id="shipping_phone"
            label="Điện thoại người nhận"
            inputProps={{ ...register("shipping.phone") }}
          /> */}
        </Stack>
      </Stack>
      <Stack direction="row">
        <Box
          sx={{
            mt: 2,
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
          }}
        >
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
              <OrderTableHead headCells={headCellsEdit} />
              <TableBody>
                {listProduct.map((item, index) => (
                  <RowEditProduct
                    key={index}
                    row={item}
                    index={index as number}
                  />
                ))}
                {shippingLines.length ? (
                  shippingLines.map((shipping, i) => (
                    <RowShipping key={i} row={shipping} index={i} />
                  ))
                ) : (
                  <></>
                )}
                {feeLines.length ? (
                  feeLines.map((fee, i) => (
                    <RowFee key={i} row={fee} index={i} />
                  ))
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack alignItems="flex-end" sx={{ px: 8, py: 1 }}>
            <Stack direction="row" spacing={10} justifyContent="space-between">
              <p>Tạm tính:</p>
              {listProduct.length ? (
                <b>{convertNumberFormat(prodsPrice.toString())}</b>
              ) : (
                <b>0</b>
              )}
            </Stack>
            <Stack direction="row" spacing={10} justifyContent="space-between">
              <p>Giao nhận hàng:</p>
              {shippingLines.length ? (
                <b>{convertNumberFormat(shipFee.toString())}</b>
              ) : (
                <b>0</b>
              )}
            </Stack>
            <Stack direction="row" spacing={10} justifyContent="space-between">
              <p>Phí khác:</p>
              {feeLines.length ? (
                <b>{convertNumberFormat(customFee.toString())}</b>
              ) : (
                <b>0</b>
              )}
            </Stack>
            <Stack direction="row" spacing={10} justifyContent="space-between">
              <p>Thành tiền:</p>
              <b>
                {convertNumberFormat(
                  (
                    Number(shipFee) +
                    Number(customFee) +
                    Number(prodsPrice)
                  ).toString()
                )}
              </b>
            </Stack>
            {/* <Stack direction="row" spacing={10} justifyContent="space-between">
              <p>Giao nhận hàng:</p>
              <b>
                {convertNumberFormat(orderDetail?.shipping_total as string)}
              </b>
            </Stack>
            <Stack direction="row" spacing={10} justifyContent="space-between">
              <p>Thành tiền:</p>
              <b>{convertNumberFormat(orderDetail?.total as string)}</b>
            </Stack> */}
          </Stack>
          {/* <Stack alignItems="flex-end" sx={{ px: 8, py: 1 }}>
            <Stack direction="row" spacing={10} justifyContent="space-between">
              <p>Tạm tính:</p>
              <b>
                {convertNumberFormat(
                  JSON.stringify(
                    Number(orderDetail?.total) -
                      Number(orderDetail?.shipping_total)
                  )
                )}
              </b>
            </Stack>
            <Stack direction="row" spacing={10} justifyContent="space-between">
              <p>Giao nhận hàng:</p>
              <b>
                {convertNumberFormat(orderDetail?.shipping_total as string)}
              </b>
            </Stack>
            <Stack direction="row" spacing={10} justifyContent="space-between">
              <p>Thành tiền:</p>
              <b>{convertNumberFormat(orderDetail?.total as string)}</b>
            </Stack>
          </Stack> */}
          {!openSelectProduct && !openAddFee && !openSelectShipping ? (
            <Stack direction="row" spacing={1} sx={{ p: 2 }}>
              <CustomButton
                label="Thêm sản phẩm"
                Icon={<AddIcon />}
                onClick={handleChooseProduct}
                color="primary"
              />
              <CustomButton
                label="Thêm giao hàng"
                Icon={<AddIcon />}
                onClick={handleOpenAddShipping}
                color="info"
              />
              <CustomButton
                label="Thêm phí"
                Icon={<AddIcon />}
                onClick={handleOpenAddFee}
                color="success"
              />
            </Stack>
          ) : openSelectProduct && !openAddFee && !openSelectShipping ? (
            <Stack direction="row" spacing={2} sx={{ p: 2 }}>
              <Autocomplete
                sx={{ width: "50%" }}
                disablePortal
                id="combo-box-demo"
                options={
                  listAllProducts?.filter(
                    (prod) =>
                      !listProduct.some((prod2) => {
                        return prod2.name === prod.name;
                      }) && !prod.price.includes("-")
                  ) as unknown as readonly Product[]
                }
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Sản phẩm" />
                )}
                loading={loadingGetListProducts}
                onInputChange={(event, newInputValue) => {
                  console.log({ newInputValue });
                  setListAllProducts([]);
                  dispatch(
                    productActions.getListProducts({
                      page: 1,
                      page_size: 20,
                      search: newInputValue,
                    })
                  );
                }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.name}
                  </Box>
                )}
                onChange={(event: any, newValue) => {
                  console.log(newValue);
                  if (newValue) {
                    setListProducts([...listProduct, newValue]);
                    setValue(`line_items.${listProduct.length}.quantity`, 1);
                  }
                  handleCloseOpenProduct();
                }}
              />
              <CustomButton
                onClick={handleCloseOpenProduct}
                label="Đóng"
                color="error"
              />
            </Stack>
          ) : !openSelectProduct && openAddFee && !openSelectShipping ? (
            <Stack direction="row" spacing={2} sx={{ p: 2 }}>
              <TextField
                sx={{ width: "30%" }}
                id="fee_name"
                label="Tên phí"
                value={feeName}
                onChange={(e) => {
                  setFeeName(e.target.value);
                }}
              />
              <TextField
                sx={{ width: "30%" }}
                type="number"
                id="fee_total"
                label="Tổng tiến"
                value={feeTotal}
                onChange={(e) => {
                  setFeeTotal(e.target.value);
                }}
              />
              <CustomButton
                onClick={handleAgreeAddFee}
                label="Thêm"
                color="primary"
              />
              <CustomButton
                onClick={handleCloseAddFee}
                label="Đóng"
                color="error"
              />
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} sx={{ p: 2 }}>
              <TextField
                sx={{ width: "50%" }}
                variant="outlined"
                select
                id="shippingLine"
                label="Giao hàng"
                value={shippingLine}
                // InputLabelProps={{ shrink: !!orderStatusLabel }}
                onChange={(e: any) => {
                  console.log(e.target.value);
                  setShippingLine(e.target.value);
                }}
              >
                {listShippings.map((status) => (
                  <MenuItem
                    key={status.label}
                    value={JSON.stringify(status.value)}
                  >
                    {status.label}
                  </MenuItem>
                ))}
              </TextField>
              <CustomButton
                onClick={handleAgreeAddShipping}
                label="Thêm"
                color="primary"
              />
              <CustomButton
                onClick={handleCloseAddShipping}
                label="Đóng"
                color="error"
              />
            </Stack>
          )}
        </Box>
      </Stack>

      <Stack direction="row" sx={{ mt: 3, justifyContent: "flex-end" }}>
        <CustomButton
          color="primary"
          label="Chỉnh sửa đơn hàng"
          Icon={<SendIcon />}
          onClick={() => {
            console.log("clicked");
            handleSubmit(onSubmit)();
          }}
        />
      </Stack>
    </Box>
  );
};

export default EditOrder;
