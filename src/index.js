import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./root";
import { store } from "./Store/store";

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
