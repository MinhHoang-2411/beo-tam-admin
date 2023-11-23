import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { userActions } from "../../store/user/userSlice";
import { useParams } from "react-router-dom";
import CustomButton from "../../components/share/CustomButton";
import EditIcon from "@mui/icons-material/Edit";
import LoadingPage from "../../components/LoadingPage";
import dayjs from "dayjs";

interface FieldValues {
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  birthday?: string;
  gender?: string;
  billing?: {
    first_name?: string;
    last_name?: string;
    company?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    postcode?: string;
    country?: string;
    state?: string;
    email?: string;
    phone?: string;
  };
  shipping?: {
    first_name?: string;
    last_name?: string;
    company?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    postcode?: string;
    country?: string;
    state?: string;
    phone?: string;
  };
}
const CustomerDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const detailCustomer = useAppSelector((state) => state.user.customerDetail);
  const loadingGetInfoCustomer = useAppSelector(
    (state) => state.user.loadingCustomerDetail
  );
  const loadingCRUDCustomer = useAppSelector(
    (state) => state.user.loadingCRUDCustomer
  );
  const [typePage, setTypePage] = useState<"read" | "edit">("read");
  const genderLabels: any = {
    male: "Nam",
    female: "Nữ",
    other: "khác",
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      gender: "",
      birthday: "",
      billing: {
        first_name: "",
        last_name: "",
        company: "",
        address_1: "",
        address_2: "",
        city: "",
        postcode: "",
        country: "",
        state: "",
        email: "",
        phone: "",
      },
      shipping: {
        first_name: "",
        last_name: "",
        company: "",
        address_1: "",
        address_2: "",
        city: "",
        postcode: "",
        country: "",
        state: "",
        phone: "",
      },
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Email không hợp lệ")
          .required("Vui lòng nhập trường này"),
        first_name: yup.string().required("Vui lòng nhập trường này"),
        last_name: yup.string().required("Vui lòng nhập trường này"),
      })
    ),
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    let payload: any = {
      user_id: detailCustomer?._id,
      first_name: data.first_name,
      last_name: data.last_name,
      billing: data.billing,
      shipping: data.shipping,
      birthday: data.birthday,
      gender: data.gender,
    };
    if (data.password) {
      payload = { ...payload, password: data.password };
    }
    dispatch(
      userActions.updateCustomer({
        data: payload,
        onClose() {
          reset();
          setTypePage("read");
          dispatch(userActions.getDetailCustomer(id));
        },
      })
    );
  };

  useEffect(() => {
    if (detailCustomer?._id) {
      setValue("first_name", detailCustomer.first_name);
      setValue("last_name", detailCustomer.last_name);
      setValue("email", detailCustomer.email);
      setValue("billing", detailCustomer.billing);
      setValue("shipping", detailCustomer.shipping);
      setValue("gender", detailCustomer.gender);
      setValue("birthday", detailCustomer.birthday);
    }
  }, [detailCustomer]);

  useEffect(() => {
    dispatch(userActions.getDetailCustomer(id));
    return () => {
      dispatch(userActions.resetDetailCustomer());
    };
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      {loadingGetInfoCustomer ? (
        <LoadingPage />
      ) : (
        <>
          <Stack sx={{ mb: 4 }} direction="row" spacing={2} alignItems="center">
            <Typography variant="h3">Thông tin Thành viên</Typography>
            {typePage == "read" ? (
              <CustomButton
                onClick={() => {
                  setTypePage("edit");
                }}
                color="primary"
                label="Chỉnh sửa"
                Icon={<EditIcon />}
              />
            ) : (
              <></>
            )}
          </Stack>

          {typePage == "read" ? (
            <Stack spacing={1}>
              <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      Thông tin chung
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Tên: </b>
                      {detailCustomer?.first_name} {detailCustomer?.last_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Email: </b>
                      {detailCustomer?.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Giới tính: </b>
                      {detailCustomer?.gender
                        ? genderLabels[detailCustomer?.gender]
                        : "khác"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Ngày sinh: </b>
                      {detailCustomer?.birthday}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      Địa chỉ thanh toán
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Tên: </b>
                      {detailCustomer?.billing.first_name ||
                      detailCustomer?.billing.last_name
                        ? `${detailCustomer?.billing.first_name} ${detailCustomer?.billing.last_name}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Công ty: </b>
                      {detailCustomer?.billing.company
                        ? `${detailCustomer?.billing.company}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Địa chỉ 1: </b>
                      {detailCustomer?.billing.address_1
                        ? `${detailCustomer?.billing.address_1}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Địa chỉ 2: </b>
                      {detailCustomer?.billing.address_2
                        ? `${detailCustomer?.billing.address_2}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Thành phố: </b>
                      {detailCustomer?.billing.city
                        ? `${detailCustomer?.billing.city}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Mã bưu điện: </b>
                      {detailCustomer?.billing.postcode
                        ? `${detailCustomer?.billing.postcode}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Quốc gia: </b>
                      {detailCustomer?.billing.country
                        ? `${detailCustomer?.billing.country}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Tỉnh: </b>
                      {detailCustomer?.billing.state
                        ? `${detailCustomer?.billing.state}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Email: </b>
                      {detailCustomer?.billing.email
                        ? `${detailCustomer?.billing.email}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Điện thoại: </b>
                      {detailCustomer?.billing.phone
                        ? `${detailCustomer?.billing.phone}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      Địa chỉ nhận hàng
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Tên: </b>
                      {detailCustomer?.shipping.first_name ||
                      detailCustomer?.shipping.last_name
                        ? `${detailCustomer?.shipping.first_name} ${detailCustomer?.shipping.last_name}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Công ty: </b>
                      {detailCustomer?.shipping.company
                        ? `${detailCustomer?.shipping.company}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Địa chỉ 1: </b>
                      {detailCustomer?.shipping.address_1
                        ? `${detailCustomer?.shipping.address_1}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Địa chỉ 2: </b>
                      {detailCustomer?.shipping.address_2
                        ? `${detailCustomer?.shipping.address_2}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Thành phố: </b>
                      {detailCustomer?.shipping.city
                        ? `${detailCustomer?.shipping.city}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Mã bưu điện: </b>
                      {detailCustomer?.shipping.postcode
                        ? `${detailCustomer?.shipping.postcode}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Quốc gia: </b>
                      {detailCustomer?.shipping.country
                        ? `${detailCustomer?.shipping.country}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Tỉnh: </b>
                      {detailCustomer?.shipping.state
                        ? `${detailCustomer?.shipping.state}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h5">
                      <b>Điện thoại: </b>
                      {detailCustomer?.shipping.phone
                        ? `${detailCustomer?.shipping.phone}`
                        : "Chưa thiết lập"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          ) : (
            <>
              <Stack spacing={1}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Thông tin chung
                </Typography>
                <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
                  <TextField
                    sx={{ width: "50%" }}
                    id="first_name"
                    label="Tên"
                    inputProps={{ ...register("first_name") }}
                    error={!!errors.first_name?.message}
                    required
                    helperText={errors.first_name?.message}
                  />
                  <TextField
                    sx={{ width: "50%" }}
                    id="last_name"
                    label="Họ"
                    inputProps={{ ...register("last_name") }}
                    error={!!errors.last_name?.message}
                    required
                    helperText={errors.last_name?.message}
                  />
                </Stack>
                <TextField
                  sx={{ width: "60%" }}
                  id="email"
                  label="Email"
                  inputProps={{ ...register("email") }}
                  error={!!errors.email?.message}
                  required
                  helperText={errors.email?.message}
                />
                <FormControl sx={{ width: "60%" }}>
                  <InputLabel id="demo-simple-select-label">
                    Giới tính
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="gender"
                    label="Giới tính"
                    value={detailCustomer?.gender}
                    required
                    onChange={(e) => {
                      setValue("gender", e.target.value as string);
                    }}
                  >
                    <MenuItem value={"male"}>Nam</MenuItem>
                    <MenuItem value={"female"}>Nữ</MenuItem>
                    <MenuItem value={"other"}>Khác</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "60%" }}
                    label="Ngày sinh"
                    format="DD/MM/YYYY"
                    value={dayjs(detailCustomer?.birthday, "DD/MM/YYYY")}
                    onChange={(newDate: any) => {
                      console.log(dayjs(newDate).format("DD/MM/YYYY"));
                      setValue("birthday", dayjs(newDate).format("DD/MM/YYYY"));
                    }}
                  />
                </LocalizationProvider>
                <TextField
                  sx={{ width: "60%" }}
                  id="password"
                  label="Password"
                  inputProps={{ ...register("password") }}
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                />
                <Typography variant="h4" sx={{ my: 1 }}>
                  Địa chỉ thanh toán
                </Typography>
                <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
                  <TextField
                    sx={{ width: "50%" }}
                    id="billing-firstName"
                    label="Tên"
                    inputProps={{ ...register("billing.first_name") }}
                    error={!!errors.billing?.first_name?.message}
                    helperText={errors.billing?.first_name?.message}
                  />
                  <TextField
                    sx={{ width: "50%" }}
                    id="billing-lastname"
                    label="Họ"
                    inputProps={{ ...register("billing.last_name") }}
                    error={!!errors.billing?.last_name?.message}
                    helperText={errors.billing?.last_name?.message}
                  />
                </Stack>
                <TextField
                  sx={{ width: "60%" }}
                  id="billing-address1"
                  label="Địa chỉ 1"
                  inputProps={{ ...register("billing.address_1") }}
                  error={!!errors.billing?.address_1?.message}
                  helperText={errors.billing?.address_1?.message}
                />
                <TextField
                  sx={{ width: "60%" }}
                  id="billing-address1"
                  label="Địa chỉ 2"
                  inputProps={{ ...register("billing.address_2") }}
                  error={!!errors.billing?.address_2?.message}
                  helperText={errors.billing?.address_2?.message}
                />
                <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
                  <TextField
                    sx={{ width: "50%" }}
                    id="billing-city"
                    label="Thành phố"
                    inputProps={{ ...register("billing.city") }}
                    error={!!errors.billing?.city?.message}
                    helperText={errors.billing?.city?.message}
                  />
                  <TextField
                    sx={{ width: "50%" }}
                    id="billing-postcode"
                    label="Mã bưu điện"
                    inputProps={{ ...register("billing.postcode") }}
                    error={!!errors.billing?.postcode?.message}
                    helperText={errors.billing?.postcode?.message}
                  />
                </Stack>
                <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
                  <TextField
                    sx={{ width: "50%" }}
                    id="billing-country"
                    label="Quốc gia"
                    inputProps={{ ...register("billing.country") }}
                    error={!!errors.billing?.country?.message}
                    helperText={errors.billing?.country?.message}
                  />
                  <TextField
                    sx={{ width: "50%" }}
                    id="billing-state"
                    label="Tỉnh"
                    inputProps={{ ...register("billing.state") }}
                    error={!!errors.billing?.state?.message}
                    helperText={errors.billing?.state?.message}
                  />
                </Stack>
                <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
                  <TextField
                    sx={{ width: "50%" }}
                    id="billing-email"
                    label="Email"
                    inputProps={{ ...register("billing.email") }}
                    error={!!errors.billing?.email?.message}
                    helperText={errors.billing?.email?.message}
                  />
                  <TextField
                    sx={{ width: "50%" }}
                    id="billing-phone"
                    label="Điện thoại"
                    inputProps={{ ...register("billing.phone") }}
                    error={!!errors.billing?.phone?.message}
                    helperText={errors.billing?.phone?.message}
                  />
                </Stack>
                <Typography variant="h4" sx={{ my: 1 }}>
                  Địa chỉ nhận hàng
                </Typography>
                <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
                  <TextField
                    sx={{ width: "50%" }}
                    id="shipping-firstName"
                    label="Tên"
                    inputProps={{ ...register("shipping.first_name") }}
                    error={!!errors.shipping?.first_name?.message}
                    helperText={errors.shipping?.first_name?.message}
                  />
                  <TextField
                    sx={{ width: "50%" }}
                    id="shipping-lastname"
                    label="Họ"
                    inputProps={{ ...register("shipping.last_name") }}
                    error={!!errors.shipping?.last_name?.message}
                    helperText={errors.shipping?.last_name?.message}
                  />
                </Stack>
                <TextField
                  sx={{ width: "60%" }}
                  id="shipping-address1"
                  label="Địa chỉ 1"
                  inputProps={{ ...register("shipping.address_1") }}
                  error={!!errors.shipping?.address_1?.message}
                  helperText={errors.shipping?.address_1?.message}
                />
                <TextField
                  sx={{ width: "60%" }}
                  id="shipping-address1"
                  label="Địa chỉ 2"
                  inputProps={{ ...register("shipping.address_2") }}
                  error={!!errors.shipping?.address_2?.message}
                  helperText={errors.shipping?.address_2?.message}
                />
                <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
                  <TextField
                    sx={{ width: "50%" }}
                    id="shipping-city"
                    label="Thành phố"
                    inputProps={{ ...register("shipping.city") }}
                    error={!!errors.shipping?.city?.message}
                    helperText={errors.shipping?.city?.message}
                  />
                  <TextField
                    sx={{ width: "50%" }}
                    id="shipping-postcode"
                    label="Mã bưu điện"
                    inputProps={{ ...register("shipping.postcode") }}
                    error={!!errors.shipping?.postcode?.message}
                    helperText={errors.shipping?.postcode?.message}
                  />
                </Stack>
                <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
                  <TextField
                    sx={{ width: "50%" }}
                    id="shipping-country"
                    label="Quốc gia"
                    inputProps={{ ...register("shipping.country") }}
                    error={!!errors.shipping?.country?.message}
                    helperText={errors.shipping?.country?.message}
                  />
                  <TextField
                    sx={{ width: "50%" }}
                    id="shipping-state"
                    label="Tỉnh"
                    inputProps={{ ...register("shipping.state") }}
                    error={!!errors.shipping?.state?.message}
                    helperText={errors.shipping?.state?.message}
                  />
                </Stack>
                <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
                  <TextField
                    sx={{ width: "50%" }}
                    id="shipping-phone"
                    label="Điện thoại"
                    inputProps={{ ...register("shipping.phone") }}
                    error={!!errors.shipping?.phone?.message}
                    helperText={errors.shipping?.phone?.message}
                  />
                </Stack>
                <Stack direction="row" spacing={2} paddingTop={2}>
                  <CustomButton
                    color="primary"
                    label="Chỉnh sửa"
                    onClick={() => {
                      handleSubmit(onSubmit)();
                    }}
                    Icon={<EditIcon />}
                    disabled={loadingCRUDCustomer}
                  />
                  <CustomButton
                    color="error"
                    label="Hủy bỏ"
                    onClick={() => {
                      setTypePage("read");
                    }}
                    Icon={<EditIcon />}
                    disabled={loadingCRUDCustomer}
                  />
                </Stack>
              </Stack>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default CustomerDetail;
