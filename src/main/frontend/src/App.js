import './App.css';
import axios from "axios";
import React, {useState, useEffect}  from "react";
import Navbar from "./components/Navbar";

const FetchRules = () =>{
  axios.get("http://localhost:8080/api/rules").then(res =>{
    console.log(res);
  });
  return <h1>muqtafi</h1>
}

function App() {
  return(
  <div className="App">
    <Navbar />
    <FetchRules />
  </div>
  );
}

export default App;
