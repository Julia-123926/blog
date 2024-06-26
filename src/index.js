import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import "./index.css";
import "./stylenull.css";
import store from "./redux/store";

const repoName = "blog";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename={`/${repoName}`}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
