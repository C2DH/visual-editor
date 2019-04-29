import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { unregister } from "./registerServiceWorker";
import "./style/font-awesome.css";
import "./style/index.css";

ReactDOM.render(<App />, document.getElementById("root"));
unregister();
