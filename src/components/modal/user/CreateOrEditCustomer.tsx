import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Heading from "../../Heading";
import { Grid, TextField, Typography } from "@mui/material";
import BaseModal from "../BaseModal";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { userActions } from "../../../store/user/userSlice";
import { useEffect } from "react";

interface FieldValues {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
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

const CreateOrEditCustomerModal = () => {
  const dispatch = useAppDispatch();
  const loadingCRUDCustomer = useAppSelector(
    (state) => state.user.loadingCRUDCustomer
  );
  const isOpenModal = useAppSelector(
    (state) => state.layout.isOpenAddOrEditCustomerModal
  );
  const selectedCustomer = useAppSelector(
    (state) => state.user.selectedCustomer
  );
  const typeModal = selectedCustomer?._id ? "edit" : "create";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
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
        username: yup.string().required("Vui lòng nhập trường này"),
        email: yup
          .string()
          .email("Email không hợp lệ")
          .required("Vui lòng nhập trường này"),
        first_name: yup.string().required("Vui lòng nhập trường này"),
        last_name: yup.string().required("Vui lòng nhập trường này"),
      })
    ),
  });
  const onCloseModal = () => {
    reset();
    dispatch(layoutActions.closeModalCustomer());
    dispatch(userActions.unSelectCustomer());
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (typeModal == "create") {
      dispatch(
        userActions.createCustomer({
          data,
          onClose() {
            onCloseModal();
          },
        })
      );
    } else {
      const payload = {
        user_id: selectedCustomer?._id,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        billing: data.billing,
      };
      // console.log({ payload });
      dispatch(
        userActions.updateCustomer({
          data: payload,
          onClose() {
            onCloseModal();
          },
        })
      );
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Typography variant="h4">Thông tin chung</Typography>
      {typeModal == "create" ? (
        <TextField
          id="username"
          label="Tên đăng nhập"
          inputProps={{ ...register("username") }}
          error={!!errors.username?.message}
          required
          helperText={errors.username?.message}
        />
      ) : (
        <></>
      )}
      <TextField
        id="email"
        label="Email"
        inputProps={{ ...register("email") }}
        error={!!errors.email?.message}
        required
        helperText={errors.email?.message}
      />
      <TextField
        id="first_name"
        label="Tên"
        inputProps={{ ...register("first_name") }}
        error={!!errors.first_name?.message}
        required
        helperText={errors.first_name?.message}
      />
      <TextField
        id="last_name"
        label="Họ"
        inputProps={{ ...register("last_name") }}
        error={!!errors.last_name?.message}
        required
        helperText={errors.last_name?.message}
      />
      {typeModal == "edit" ? (
        <></>
      ) : (
        <>
          <Typography variant="h4">Địa chỉ thanh toán</Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                id="billing-firstName"
                label="Tên"
                inputProps={{ ...register("billing.first_name") }}
                error={!!errors.billing?.first_name?.message}
                helperText={errors.billing?.first_name?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="billing-lastName"
                label="Họ"
                inputProps={{ ...register("billing.last_name") }}
                error={!!errors.billing?.last_name?.message}
                helperText={errors.billing?.last_name?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="billing-address1"
                label="Địa chỉ 1"
                inputProps={{ ...register("billing.address_1") }}
                error={!!errors.billing?.address_1?.message}
                helperText={errors.billing?.address_1?.message}
                fullWidth
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <TextField
                id="billing-address2"
                label="Địa chỉ 2"
                inputProps={{ ...register("billing.address_2") }}
                error={!!errors.billing?.address_2?.message}
                helperText={errors.billing?.address_2?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="billing-city"
                label="Thành phố"
                inputProps={{ ...register("billing.city") }}
                error={!!errors.billing?.city?.message}
                helperText={errors.billing?.city?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="billing-postcode"
                label="Mã bưu điện"
                inputProps={{ ...register("billing.postcode") }}
                error={!!errors.billing?.first_name?.message}
                helperText={errors.billing?.first_name?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="billing-country"
                label="Quốc gia"
                inputProps={{ ...register("billing.country") }}
                error={!!errors.billing?.country?.message}
                helperText={errors.billing?.country?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="billing-state"
                label="State"
                inputProps={{ ...register("billing.state") }}
                error={!!errors.billing?.state?.message}
                helperText={errors.billing?.state?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="billing-email"
                label="E-mail"
                inputProps={{ ...register("billing.email") }}
                error={!!errors.billing?.email?.message}
                helperText={errors.billing?.email?.message}
                fullWidth
              />
            </Grid>{" "}
            <Grid item xs={6}>
              <TextField
                id="billing-phone"
                label="Số điện thoại"
                inputProps={{ ...register("billing.phone") }}
                error={!!errors.billing?.phone?.message}
                helperText={errors.billing?.phone?.message}
                fullWidth
              />
            </Grid>
          </Grid>

          <Typography variant="h4">Địa chỉ nhận hàng</Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                id="shipping-firstName"
                label="Tên"
                inputProps={{ ...register("shipping.first_name") }}
                error={!!errors.shipping?.first_name?.message}
                helperText={errors.shipping?.first_name?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="shipping-lastname"
                label="Họ"
                inputProps={{ ...register("shipping.last_name") }}
                error={!!errors.shipping?.last_name?.message}
                helperText={errors.shipping?.last_name?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="shipping-address1"
                label="Địa chỉ 1"
                inputProps={{ ...register("shipping.address_1") }}
                error={!!errors.shipping?.address_1?.message}
                helperText={errors.shipping?.address_1?.message}
                fullWidth
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <TextField
                id="shipping-address2"
                label="Địa chỉ 2"
                inputProps={{ ...register("shipping.address_2") }}
                error={!!errors.shipping?.address_2?.message}
                helperText={errors.shipping?.address_2?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="shipping-city"
                label="Thành phố"
                inputProps={{ ...register("shipping.city") }}
                error={!!errors.shipping?.city?.message}
                helperText={errors.shipping?.city?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="shipping-postcode"
                label="Mã bưu điện"
                inputProps={{ ...register("shipping.postcode") }}
                error={!!errors.shipping?.first_name?.message}
                helperText={errors.shipping?.first_name?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="shipping-country"
                label="Quốc gia"
                inputProps={{ ...register("shipping.country") }}
                error={!!errors.shipping?.country?.message}
                helperText={errors.shipping?.country?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="shipping-state"
                label="State"
                inputProps={{ ...register("shipping.state") }}
                error={!!errors.shipping?.state?.message}
                helperText={errors.shipping?.state?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="shipping-phone"
                label="Số điện thoại"
                inputProps={{ ...register("shipping.phone") }}
                error={!!errors.shipping?.phone?.message}
                helperText={errors.shipping?.phone?.message}
                fullWidth
              />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );

  useEffect(() => {
    if (selectedCustomer?._id) {
      setValue("username", selectedCustomer.username);
      setValue("email", selectedCustomer.email);
      setValue("first_name", selectedCustomer.first_name);
      setValue("last_name", selectedCustomer.last_name);
      setValue("billing", selectedCustomer.billing);
    }
  }, [selectedCustomer, setValue]);

  return (
    <BaseModal
      disabled={loadingCRUDCustomer}
      isOpen={isOpenModal}
      title={
        typeModal == "create" ? "Tạo thành viên mới" : "Chỉnh sửa thành viên"
      }
      actionLabel={typeModal == "create" ? "Tạo" : "Sửa"}
      onClose={onCloseModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      bgColor="#fff"
    />
  );
};

export default CreateOrEditCustomerModal;
