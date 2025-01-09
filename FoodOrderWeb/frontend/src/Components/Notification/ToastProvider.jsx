import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export const showToast = (message, type = "success") => {
  switch (type) {
    case "success":
      toast.success(message, {
        style: {
          backgroundColor: "white",
          color: "black",
          borderRadius: "10px",
          padding: "10px 20px",
        },
      });
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    default:
      toast(message);
  }
};

export default ToastProvider;
