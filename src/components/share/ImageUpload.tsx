import { IconButton, Stack } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface IImage {
  src: any;
  alt?: string;
  onDelete?: () => void;
  width?: any;
}

const ImageUpload = ({ src, alt, onDelete, width }: IImage) => {
  return (
    <Stack
      justifyContent="center"
      sx={{
        width: width ? width : "180px",
        height: "200px",
        borderRadius: "8px",
        position: "relative",
        bgcolor: "#f6f6f6",
        backgroundImage: `url(${src})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <IconButton
        size="small"
        onClick={onDelete}
        sx={{
          position: "absolute",
          top: "4px",
          right: "4px",
          color: "white",
          boxShadow: "1px",
          bgcolor: "#00000054 !important",
        }}
      >
        <HighlightOffIcon />
      </IconButton>
    </Stack>
  );
};

export default ImageUpload;
