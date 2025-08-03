// File: src/main.jsx

// Core React imports
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Entry point of the application.
// This simply mounts the main App component to the DOM.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


