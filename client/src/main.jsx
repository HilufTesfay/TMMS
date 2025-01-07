import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerLicense } from "@syncfusion/ej2-base";
// Register the license key
registerLicense(import.meta.env.VITE_LICENCE_KEY);
import App from "./App.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
