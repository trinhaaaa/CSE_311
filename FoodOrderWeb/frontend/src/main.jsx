import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./Context/StoreContext";
import ToastProvider from "./Components/Notification/ToastProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
      <ToastProvider />
    </StoreContextProvider>
  </BrowserRouter>
);
