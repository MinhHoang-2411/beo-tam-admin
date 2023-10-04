import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../hooks/store";

const LoadingOverLay = () => {
  const isLayoutLoading = useAppSelector(
    (state) => state.layout.isLayoutLoading
  );
  return isLayoutLoading ? (
    <div
      style={{
        zIndex: 9999,
        background: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        sx={{ position: "relative", top: "50%", transform: "translateY(-50%)" }}
        color="secondary"
      />
    </div>
  ) : (
    <></>
  );
};

export default LoadingOverLay;
