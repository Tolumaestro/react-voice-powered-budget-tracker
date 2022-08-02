import React from "react";
import ReactDOM from "react-dom";
import { SpeechProvider } from "@speechly/react-client";

import { GlobalProvider } from "./components/context/context";
import App from "./App";
import "./index.css"

ReactDOM.render(
    <SpeechProvider appId="57e73331-aae7-4115-9732-9f120f7fed16" language="en-US">
        <GlobalProvider>
            <App />
        </GlobalProvider>
    </SpeechProvider>,
document.getElementById("root"))