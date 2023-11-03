import { Box } from "@mui/material";
import { useState } from "react";

interface IChipPayment {
  payment: "momo_qr_scan" | "bacs" | "cod";
  paymentTitle: string;
}

const ChipPayment = ({ payment, paymentTitle }: IChipPayment) => {
  const [listPaymentColor] = useState({
    momo_qr_scan: "#8d007c",
    cod: "#ad8800",
    bacs: "#005ccc",
  });
  return (
    <Box
      sx={{
        p: 1,
        bgcolor: listPaymentColor[`${payment}`],
        color: "#fff",
        borderRadius: "4px",
        textAlign: "center",
        minWidth: "100px",
        maxWidth: "200px",
      }}
    >
      {paymentTitle}
    </Box>
  );
};
export default ChipPayment;
