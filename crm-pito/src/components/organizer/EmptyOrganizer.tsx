import { Box, Stack, Typography } from "@mui/material";
import EmptyImg from "../../assets/emptyData/folder.png";
import CustomButton from "../share/CustomButton";
import AddIcon from "@mui/icons-material/Add";

interface IEmptyOrganizer {
  text?: string;
  labelBtn?: string;
  onAction?: () => void;
}

const EmptyOrganizer = ({ text, onAction, labelBtn }: IEmptyOrganizer) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ height: "85vh", width: "100%" }}
    >
      <img src={EmptyImg} alt="empty" width="300" />
      <Typography
        sx={{ fontSize: "24px", fontWeight: 600, color: "#A5A5A5", mb: 1 }}
      >
        {text ? text : `Opps! Data empty`}
      </Typography>
      <CustomButton
        onClick={onAction}
        Icon={<AddIcon />}
        label={labelBtn ? labelBtn : "Import now"}
        color="primary"
      />
    </Stack>
  );
};

export default EmptyOrganizer;
