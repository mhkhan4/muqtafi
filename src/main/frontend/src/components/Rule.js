import axios from "axios";
import React, {useState, useEffect}  from "react";
import Navbar from "./Navbar";

const Rules = () =>{
    const [rules, setRules] = useState([]);

    const fetchRules = () =>{
        axios.get("http://localhost:8080/api/rules").then(res =>{
          console.log(res);
          setRules(res.data);
        });
      };
    
      useEffect(() =>{
        fetchRules();
      }, []);

      return rules.map((rule, index) =>{
        return(
            <div className='dashboard'>
                <div key={index} className='dashboard-app'>
                    <h1>{rule.ruleDescription}</h1>
                </div>
            </div>
        );
      });
}
  
  function Rule() {
    return(
    <div className="App">
      <Navbar />
      <Rules />
    </div>
    );
  }
  
  export default Rule;