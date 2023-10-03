import { Paper } from "@mui/material";
import { useAppDispatch } from "../../../hooks/store";
import { useNavigate } from "react-router-dom";
import SendEmail from "./SendEmail";
import { useState } from "react";
import VerifyCode from "./VerifyCode";
import ResetPwd from "./ResetPwd";

const ForgotPwd = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);
  const onNextStep = () => {
    setStep((step) => step + 1);
  };
  return (
    <Paper
      sx={{
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "500px",
        borderRadius: "8px",
        padding: "12px",
      }}
    >
      {/* form  */}
      {step == 0 ? (
        <SendEmail onNext={onNextStep} />
      ) : step == 1 ? (
        <VerifyCode onNext={onNextStep} />
      ) : (
        <ResetPwd />
      )}

      <div
        className="
      text-neutral-500 mt-4 font-light"
      >
        <p
          onClick={() => {
            navigate("/login");
          }}
          className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
        >
          Trở lại đăng nhập
        </p>
      </div>
    </Paper>
  );
};

export default ForgotPwd;
