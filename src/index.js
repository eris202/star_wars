import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import { AlertHook } from "./Hook/alert";

// import("custom-env").env();
// import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <AlertHook>
      <ToastContainer position={"bottom-left"} />
      <App />
    </AlertHook>
  </React.StrictMode>,
  document.getElementById("root")
);
