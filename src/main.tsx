import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import history from "./routes/history";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { store } from "./store";
import "./index.css";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
