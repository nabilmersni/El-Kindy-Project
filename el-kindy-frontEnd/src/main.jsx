import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { store } from "./Store";
import { SocketProvider } from "./features/context/SocketContext";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeProvider>
    <Provider store={store}>
      <SocketProvider>
        <App />
        <ToastContainer />
      </SocketProvider>
    </Provider>
  </ThemeProvider>
  // </React.StrictMode>
);
