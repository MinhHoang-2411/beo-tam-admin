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
        width: "500px",
        borderRadius: "8px",
        padding: "12px",
      }}
    >
      <Login />
    </Paper>
  );
};

export default AuthPage;
