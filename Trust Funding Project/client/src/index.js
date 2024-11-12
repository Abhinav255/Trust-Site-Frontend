
import React from "react";
import ReactDOM from "react-dom/client";


import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Provider } from "react-redux";
import store from "./redux/store"; 
import App from "App";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
  <App />
</Provider>,
);
