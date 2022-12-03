import axios from "axios";
import React, {useState, useEffect}  from "react";
import Navbar from "./Navbar";
import "./Rule.css";
import Popup from "./Popup";
import Dropdown from 'react-bootstrap/Dropdown';


const GetRules = () =>{
    const [rules, setRules] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);

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
            <div key={index} id={rule.ruleId} value={rule.ruleDescription}>
                <Dropdown>
                    <Dropdown.Toggle variant="" id="dropdown-basic"></Dropdown.Toggle>
                    {` ${rule.ruleDescription}`}
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" onClick={(e) => DeleteRule(e)}>Delete</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={() => setButtonPopup(true)}>Update</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <form onSubmit={(e) => {
                        UpdateRule(e);
                        setButtonPopup(false);
                        window.location.reload(); 
                    }}>
                        <div>
                            <input className="form-control" type="text" id="frule" name="frule" placeholder="Type the rule"/>
                            <button style={{marginLeft: "45%", marginTop: 20}} type="submit" class="btn btn-primary mb-2">Submit</button>
                        </div>
                    </form>
                </Popup>
            </div>
        );
        
      });
}

const DeleteRule = (e)=>{
    e.preventDefault();
    let divId = e.target.parentElement.parentElement.parentElement.id;
    
    axios.delete(`http://localhost:8080/api/rules/${divId}`).then(response => {
        console.log(response);
        window.location.reload(); 

      });
}

const UpdateRule = (e)=>{
    e.preventDefault();
    
    let divId = e.target.parentElement.parentElement.parentElement.id;
    let newVal = e.target[0].value;

    axios.put('http://localhost:8080/api/rules/' + divId, {
        ruleDescription: newVal
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
            <h1>Basic Rules: <i style={{cursor: "pointer"}} className="bi bi-plus" onClick={()=> setButtonPopup(true)}></i></h1>
            <ul><GetRules /></ul>
        </div>

        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <form onSubmit={(event) => {
                AddRule(event);
                setButtonPopup(false);
                window.location.reload(); 
            }}>
                <div>
                    <input className="form-control" type="text" id="frule" name="frule" placeholder="Type the rule"/>
                    <button style={{marginLeft: "45%", marginTop: 20}} type="submit" class="btn btn-primary mb-2">Submit</button>
                </div>
            </form>
        </Popup>
    </div>
    );
}
  
  export default Rule;