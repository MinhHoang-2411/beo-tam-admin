import { Paper } from "@mui/material";
import Login from "./login";

const AuthPage = () => {
  return (
    <Paper
      sx={{
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "400px",
        borderRadius: "8px",
        padding: "12px",
        background: "#a7ffe11c",
      }}
    >
      <Login />
    </Paper>
  );
};

export default AuthPage;
