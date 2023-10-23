import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { userActions } from "../../store/user/userSlice";
import { useParams } from "react-router-dom";
import CustomButton from "../../components/share/CustomButton";
import EditIcon from "@mui/icons-material/Edit";
import LoadingPage from "../../components/LoadingPage";

interface FieldValues {
  first_name: string;
  last_name: string;
}
const AdminDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const detailAdmin = useAppSelector((state) => state.user.adminDetail);
  const loadingGetInfoAdmin = useAppSelector(
    (state) => state.user.loadingAdminDetail
  );
  const loadingCRUDAdmin = useAppSelector(
    (state) => state.user.loadingCRUDAdmin
  );
  const [typePage, setTypePage] = useState<"read" | "edit">("read");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        first_name: yup.string().required("Vui lòng nhập trường này"),
        last_name: yup.string().required("Vui lòng nhập trường này"),
      })
    ),
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const payload = {
      user_id: detailAdmin?._id,
      first_name: data.first_name,
      last_name: data.last_name,
    };
    dispatch(
      userActions.updateAdmin({
        data: payload,
        onClose() {
          setTypePage("read");
          dispatch(userActions.getDetailAdmin(id));
        },
      })
    );
  };

  useEffect(() => {
    if (detailAdmin?._id) {
      setValue("first_name", detailAdmin.first_name);
      setValue("last_name", detailAdmin.last_name);
    }
  }, [detailAdmin]);

  useEffect(() => {
    dispatch(userActions.getDetailAdmin(id));
    return () => {
      dispatch(userActions.resetDetailAdmin());
    };
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      {loadingGetInfoAdmin ? (
        <LoadingPage />
      ) : (
        <>
          <Stack sx={{ mb: 2 }} direction="row" spacing={2} alignItems="center">
            <Typography variant="h3">Thông tin Quản trị viên</Typography>
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

          <Grid container spacing={2}>
            {typePage == "read" ? (
              <>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    <b>Tên: </b>
                    {detailAdmin?.first_name} {detailAdmin?.last_name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    <b>Email: </b>
                    {detailAdmin?.email}
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <TextField
                    sx={{ mr: 1, width: "30%" }}
                    id="first_name"
                    label="Tên"
                    inputProps={{ ...register("first_name") }}
                    error={!!errors.first_name?.message}
                    required
                    helperText={errors.first_name?.message}
                  />
                  <TextField
                    sx={{ width: "30%" }}
                    id="last_name"
                    label="Họ"
                    inputProps={{ ...register("last_name") }}
                    error={!!errors.last_name?.message}
                    required
                    helperText={errors.last_name?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ width: "calc(60% + 8px)" }}
                    id="email"
                    label="Email"
                    value={detailAdmin?.email}
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={1}>
                    <CustomButton
                      color="primary"
                      label="Chỉnh sửa"
                      onClick={() => {
                        handleSubmit(onSubmit)();
                      }}
                      Icon={<EditIcon />}
                      disabled={loadingCRUDAdmin}
                    />
                    <CustomButton
                      color="error"
                      label="Hủy bỏ"
                      onClick={() => {
                        setTypePage("read");
                      }}
                      Icon={<EditIcon />}
                      disabled={loadingCRUDAdmin}
                    />
                  </Stack>
                </Grid>
              </>
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AdminDetail;
