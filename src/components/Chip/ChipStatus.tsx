import { Box } from "@mui/material";
import { useState } from "react";

interface IChipStatus {
  status:
    | "pending"
    | "processing"
    | "on-hold"
    | "completed"
    | "cancelled"
    | "refunded"
    | "failed"
    | "Draft";
}

const ChipStatus = ({ status }: IChipStatus) => {
  const [listStatusObject] = useState<any>({
    pending: "Đang xử lý",
    processing: "Chờ thanh toán",
    "on-hold": "Tạm giữ",
    completed: "Đã hoàn thành",
    cancelled: "Đã hủy",
    refunded: "Đã hoàn lại tiền",
    failed: "Thất bại",
    Draft: "Đã xóa",
  });

  const [listStatusColor] = useState({
    pending: "#FF9966",
    processing: "#0099FF",
    "on-hold": "#336699",
    completed: "#52A186",
    cancelled: "#888888",
    refunded: "#9900CC",
    failed: "#DD0000",
    Draft: "#880000",
  });
  return (
    <Box
      sx={{
        p: 1,
        bgcolor: listStatusColor[`${status}`],
        color: "#fff",
        borderRadius: "4px",
        textAlign: "center",
        minWidth: "100px",
        maxWidth: "200px",
      }}
    >
      {listStatusObject[status]}
    </Box>
  );
};
export default ChipStatus;
