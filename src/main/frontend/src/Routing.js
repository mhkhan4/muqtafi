import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import App from "./App";
import Rule from "./components/Rule";

function Routing() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path = "/" exact element={<App />} />
                    <Route path = "/rules" element={<Rule />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default Routing