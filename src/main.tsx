import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/Main";
import "./index.css";
import "./styles/index.ts";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
