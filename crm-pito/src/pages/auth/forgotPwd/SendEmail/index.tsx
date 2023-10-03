import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Stack, TextField } from "@mui/material";
import Heading from "../../../../components/Heading";
import { useDispatch } from "react-redux";
import { authActions } from "../../../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/share/CustomButton";

interface FormValues {
  email: string;
}

const SendEmail = ({ onNext }: { onNext: () => void }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Email không hợp lệ")
          .required("Email không hợp lệ"),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const payload = {
      params: { ...data },
      onNext() {
        onNext();
      },
    };
    console.log(payload);
    dispatch(authActions.sendEmail(payload));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap="16px">
        <Heading
          title="Quên mật khẩu?"
          subtitle="Đừng lo lắng, hãy nhập email đăng ký của bạn."
        />
        <TextField
          id="email"
          label="Email"
          inputProps={{ ...register("email") }}
          error={!!errors.email?.message}
          required
          helperText={errors.email?.message}
        />
        <CustomButton color="primary" type="submit" label="Gửi" />
      </Stack>
    </form>
  );
};

export default SendEmail;
