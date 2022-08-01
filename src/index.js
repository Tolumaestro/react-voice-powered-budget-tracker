import React from "react";
import ReactDOM from "react-dom";

import { GlobalProvider } from "./components/context/context";
import App from "./App";
import "./index.css"

ReactDOM.render(
    <GlobalProvider>
        <App />
    </GlobalProvider>,
document.getElementById("root"))