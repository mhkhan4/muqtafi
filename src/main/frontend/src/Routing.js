import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import App from "./App";
import Rule from "./components/Rule";
import Idea from "./components/Idea";

function Routing() {
    return (
        <BrowserRouter>
            <div >
                <Routes>
                    <Route path = "/" exact element={<App />} />
                    <Route path = "/rules" element={<Rule />} />
                    <Route path = "/ideas" element={<Idea />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default Routing