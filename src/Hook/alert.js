import React from "react";
import { createContext, useContext } from "react";
import { toast } from "material-react-toastify";

const AlertContext = createContext("");

export const AlertHook = ({ children }) => {
  const alert = {
    error: (mesaage) => {
      toast.error(mesaage);
    },
    success: (mesaage) => {
      toast.success(mesaage);
    },
    warning: (mesaage) => {
      toast.warning(mesaage);
    },
  };

  return (
    <AlertContext.Provider value={{ alert: { ...alert } }}>
      {children}
    </AlertContext.Provider>
  );
};

export default function useALert() {
  const getContext = useContext(AlertContext);

  return getContext;
}
