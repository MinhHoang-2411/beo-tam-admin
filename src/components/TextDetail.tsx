import { Stack, Typography } from "@mui/material";
import { useState } from "react";
type ITextDetail = { label: string; value: string };

const TextDetail = ({ label, value }: ITextDetail) => {
  const [isDetailText, setIsDetailText] = useState(false);
  const toggleDetailText = () => {
    setIsDetailText(!isDetailText);
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h4" sx={{ fontWeight: 500, color: "#4b4b4b" }}>
        {label}
      </Typography>
      <Typography variant="h6" sx={{ color: "#767676" }}>
        {value.length > 500
          ? !isDetailText
            ? `${value.slice(0, 500)} `
            : `${value} `
          : value}

        {value.length > 500 && (
          <Typography
            variant="h6"
            sx={{
              color: "#363636",
              cursor: "pointer",
              "&:hover": { color: "#00B3D5", textDecoration: "underline" },
              display: "inline-block",
            }}
            onClick={toggleDetailText}
          >
            {isDetailText ? `(ẩn bớt)` : `(...xem thêm)`}
          </Typography>
        )}
      </Typography>
    </Stack>
  );
};

export default TextDetail;
