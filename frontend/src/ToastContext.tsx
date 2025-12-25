import { createContext, useContext } from "react";

interface ToastMsg {
  id: number;
  type: "success" | "error" | "info";
  message: string;
}

const ToastContext = createContext({
  showToast: (type: "success" | "error" | "info", message: string) => {},
});

export const useToast = () => useContext(ToastContext);
