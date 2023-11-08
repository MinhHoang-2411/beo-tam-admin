import { Box } from "@mui/material";
import { useState } from "react";

interface IChipProductType {
  type: "publish" | "private";
}

const ChipProductType = ({ type }: IChipProductType) => {
  const [listProductTypeObject] = useState<any>({
    publish: "Đã xuất bản",
    private: "Riêng tư",
  });

  const [listProductTypeColor] = useState({
    publish: "#009468",
    private: "#b95900",
  });
  return (
    <Box
      sx={{
        p: 1,
        bgcolor: listProductTypeColor[`${type}`],
        color: "#fff",
        borderRadius: "4px",
        textAlign: "center",
        minWidth: "100px",
        maxWidth: "200px",
      }}
    >
      {listProductTypeObject[type]}
    </Box>
  );
};
export default ChipProductType;
