import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Heading from "../../../../components/Heading";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import CustomButton from "../../../../components/share/CustomButton";
import { authActions } from "../../../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface FormValues {
  newPwd: string;
  confirmNewPwd: string;
}

const ResetPwd = () => {
  const [showPassword, setShowPassword] = useState(false);
  const tokenResetPwd = useAppSelector((state) => state.auth.tokenResetPwd);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      newPwd: "",
      confirmNewPwd: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        newPwd: yup.string().required("Vui lòng nhập mật khẩu mới"),
        confirmNewPwd: yup
          .string()
          .required("Vui lòng nhập mật khẩu xác nhận mới")
          .oneOf([yup.ref("newPwd")], "Mật khẩu mới của bạn không trùng khớp"),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const payload = {
      params: { password: data.newPwd, token: tokenResetPwd },
      onNext() {
        navigate("/login");
      },
    };
    dispatch(authActions.resetPwd(payload));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap="16px">
        <Heading
          title="Đặt lại mật khẩu của bạn"
          subtitle="Nhập mật khẩu mới của bạn"
        />
        <TextField
          id="newPwd"
          label="Mật khẩu mới"
          type={showPassword ? "text" : "password"}
          inputProps={{ ...register("newPwd") }}
          error={!!errors.newPwd?.message}
          required
          helperText={errors.newPwd?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="confirmNewPwd"
          label="Xác nhận mật khẩu mới"
          type={showPassword ? "text" : "password"}
          inputProps={{ ...register("confirmNewPwd") }}
          error={!!errors.confirmNewPwd?.message}
          required
          helperText={errors.confirmNewPwd?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <CustomButton color="primary" label="Thay đổi" type="submit" />
      </Stack>
    </form>
  );
};

export default ResetPwd;
