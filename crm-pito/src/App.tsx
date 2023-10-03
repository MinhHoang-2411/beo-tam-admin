import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { themeSettings } from "./theme";
import { getAuth } from "./utils/auth";
import { useAppSelector } from "./hooks/store";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  const mode = useAppSelector((state) => state.layout.theme);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = localStorage.getItem("fakeToken");
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="app">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isAuth && isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
          <ToastContainer autoClose={3000} />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default App;
