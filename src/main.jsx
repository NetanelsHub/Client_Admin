import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalProvider from "./helper/GlobalContext.jsx";
import ProductProvider from "./helper/ProductContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <ProductProvider>
      <App />
    </ProductProvider>
  </GlobalProvider>
);
