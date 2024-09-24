import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./login/Login.tsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Login />
    </React.StrictMode>,
);
