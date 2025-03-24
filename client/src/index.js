//Importerar React och ReactDOM.
//Hämtar App.js och renderar den inuti <div id="root"></div> i public/index.html.
//Använder BrowserRouter för att aktivera routing.
//Importerar App.css (om det finns).

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);