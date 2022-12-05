import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import App from "./App";
import Rule from "./components/Rule";
import Idea from "./components/Idea";
import Task from "./components/Tasks";
import Tracker from './components/Tracker';

function Routing() {
    return (
        <BrowserRouter>
            <div >
                <Routes>
                    <Route path = "/" exact element={<App />} />
                    <Route path = "/rules" element={<Rule />} />
                    <Route path = "/ideas" element={<Idea />} />
                    <Route path = "/tasks" element={<Task />} />
                    <Route path = "/tracker" element={<Tracker />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default Routing