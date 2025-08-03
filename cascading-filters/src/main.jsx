import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext";

// 🆕 Import BSPHCL logo
import bspLogo from "./assets/images/BSPHCL.png"; // or .jpg if needed

// 🆕 Set favicon dynamically
const link =
  document.querySelector("link[rel~='icon']") || document.createElement("link");
link.rel = "icon";
link.href = bspLogo;
document.head.appendChild(link);

// 🆕 Set title
document.title = "BSPHCL MIS";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
