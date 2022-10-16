import axios from "axios";
import React, {useState, useEffect}  from "react";
import Navbar from "./Navbar";
import "./Rule.css";
import Popup from "./Popup";


const GetRules = () =>{
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
            <div key={index}>
                <li>{rule.ruleDescription}</li>
            </div>
        );
      });
}

const AddRule = (event)=>{
    event.preventDefault();
    var ruleToAdd = event.target[0].value

    axios.post('http://localhost:8080/api/rules', {
        ruleDescription: ruleToAdd
    })
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });
}


function Rule() {
    const [buttonPopup, setButtonPopup] = useState(false);
    return(
    <div>
        <Navbar />
        <div className="rule-design">
            <h1>Basic Rules: <button className="plus-btn" onClick={()=> setButtonPopup(true)}>+</button></h1>
            <ul><GetRules /></ul>
        </div>

        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <form onSubmit={(event) => {
                AddRule(event);
                setButtonPopup(false);
                window.location.reload();
            }}>
                <label htmlFor="frule">Type the rule:</label><br/>
                <input type="text" id="frule" name="frule"/>
                <button type="submit">Submit</button>
            </form>
        </Popup>
    </div>
    );
}
  
  export default Rule;