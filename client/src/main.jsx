import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter
} from "react-router-dom";


import App from "./App.jsx";

import "./index.css";


import {
  CurrencyProvider
} from "./context/CurrencyContext.jsx";




ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>


    <BrowserRouter>


      <CurrencyProvider>


        <App />


      </CurrencyProvider>


    </BrowserRouter>


  </React.StrictMode>

);