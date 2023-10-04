import { SubmitHandler, useForm } from "react-hook-form";
import Countdown from "react-countdown";
import ReactCodeInput from "react-code-input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Stack } from "@mui/material";
import Heading from "../../../../components/Heading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/share/CustomButton";
import style from "./verifyCode.module.scss";
import { useCallback, useState } from "react";
import { useAppSelector } from "../../../../hooks/store";
import { authActions } from "../../../../store/auth/authSlice";

interface FormValues {
  code: string;
}

const VerifyCode = ({ onNext }: { onNext: () => void }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenVerify = useAppSelector((state) => state.auth.tokenVerifyPwd);
  const [otp, setOtp] = useState("");
  const [expiryTime, setExpiryTime] = useState(Date.now() + 60000 * 5);

  // Random component
  const Completionist = () => <span>Mã của bạn đã hết hạn</span>;

  const addLeadingZeros = (value: number) => {
    if (value < 10) {
      return `0${value}`;
    }
    return value;
  };
  const renderer = useCallback(
    ({
      hours,
      minutes,
      seconds,
      completed,
    }: {
      hours: any;
      minutes: any;
      seconds: any;
      completed: any;
    }) => {
      if (completed) {
        // Render a complete state
        return <Completionist />;
      } else {
        // Render a countdown
        return (
          <span>
            Mã của bạn sẽ hết hạn sau {addLeadingZeros(minutes)}:
            {addLeadingZeros(seconds)}
          </span>
        );
      }
    },
    []
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      code: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        code: yup.string().required("Vui lòng nhập mã OTP"),
      })
    ),
  });
  const onChange = (code: string) => {
    setValue("code", code);
    setOtp(code);
    console.log(code);
  };

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const payload = {
      params: { code: data.code, token: tokenVerify },
      onNext() {
        onNext();
      },
    };
    dispatch(authActions.verifyOtp(payload));
  };
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap="16px">
        <Heading
          title="Nhập mã OTP"
          subtitle="Nhập mã OTP chúng tôi vừa gửi đến email đăng ký của bạn."
        />
        <Stack direction="row" justifyContent="center">
          <ReactCodeInput
            type="number"
            className={style.reactCodeInput}
            fields={6}
            onChange={onChange}
            name="arrayCode"
            inputMode="numeric"
            inputStyle={{
              border: "1px solid",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,.10)",
              margin: "0 3px",
              textAlign: "center",
              width: "15%",
              height: "60px",
              fontSize: "32px",
              boxSizing: "border-box",
              color: "#262626",
              backgroundColor: "#fff",
              borderColor: "lightgrey",
              borderRadius: "4px",
            }}
          />
        </Stack>
        <Countdown date={expiryTime} renderer={renderer} />
        <CustomButton
          color="primary"
          type="submit"
          label="Send"
          disabled={otp.length < 6}
        />
      </Stack>
    </form>
  );
};

export default VerifyCode;
