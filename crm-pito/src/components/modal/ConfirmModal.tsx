import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { modalActions } from "../../store/modal/modalSlice";
import CustomButton from "../share/CustomButton";

const titleModal = {
  fontSize: "20px",
  fontWeight: "bold",
  padding: "10px 24px !important",
  borderBottom: "1px solid #ccc",
};
const contentModal = {
  paddingTop: "20px !important",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
const footerModal = {
  padding: "10px 24px 20px !important",
  display: "flex",
  justifyContent: "space-between",
};

export default function ConfirmModal() {
  const dispatch = useAppDispatch();
  const { isShow, title, content, onAction, buttonText } = useAppSelector(
    (state) => state.modal.data
  );
  useAppSelector;

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  const handleSubmit = () => {
    if (onAction) {
      onAction();
    }
    dispatch(modalActions.closeModal());
  };

  return (
    <Dialog
      open={isShow}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={titleModal}>{title}</DialogTitle>
      <DialogContent sx={contentModal}>
        <ErrorOutlineIcon
          sx={{
            width: 100,
            height: 100,
            color: "#fbb450",
          }}
          fontSize="medium"
        />
        <DialogContentText sx={{ pt: 1, fontSize: "16px", width: "100%" }}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={footerModal}>
        <CustomButton
          color="error"
          onClick={handleClose}
          label="Hủy bỏ"
          Icon={<CloseIcon style={{ fontSize: "16px" }} />}
        />

        <CustomButton
          color="primary"
          onClick={handleSubmit}
          label={buttonText || "OK"}
          Icon={<CheckIcon style={{ fontSize: "16px" }} />}
        />
      </DialogActions>
    </Dialog>
  );
}
