import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";

import "./index.css"; // Tailwind styles are imported from here

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
