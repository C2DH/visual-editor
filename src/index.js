import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { unregister } from "./registerServiceWorker";
import "./style/font-awesome.css";
import "./style/index.css";

console.info('Version:',
  process.env.REACT_APP_VISUAL_EDITOR_GIT_BRANCH,
  process.env.REACT_APP_VISUAL_EDITOR_GIT_REVISION,
);
ReactDOM.render(<App />, document.getElementById("root"));
unregister();
