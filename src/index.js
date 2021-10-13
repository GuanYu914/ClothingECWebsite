import React from "react";
import ReactDOM from "react-dom";
// 添加自定義的 css 檔案
import "./utils/reset.css";
import "./utils/font.css";
import "./utils/color.css";
import "./utils/global.css";
import "./utils/effect.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
