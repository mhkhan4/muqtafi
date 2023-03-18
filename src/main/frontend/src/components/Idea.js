import React, {useState, useReducer}  from "react";
import GetData from '../restApiMethods/GetData';
import Navbar from './Navbar';
import "./Idea.css";
import Popup from "./Popup";
import axios from "axios";

function ideaCard(idea) {
  return(
    <div className="card" style={{backgroundColor:"green"}}>
      <div className="card-body">
        <h4 className="card-title wrapper">{idea.ideaName}</h4>
        <p className="card-text wrapper">{idea.ideaDescription}</p>
      </div>
    </div>
        
  );
}

const addIdea = (e, setValue) =>{
  e.preventDefault();
  var ideaN = e.target[0].value;
  var ideaD = e.target[1].value;

  axios.post('http://localhost:8080/api/ideas', {
      ideaName: ideaN,
      ideaDescription: ideaD
  })
  .then(function(response){
      console.log(response);
      setValue();
  })
  .catch(function(error){
      console.log(error);
  });
}



function Idea() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [value, setValue] = useReducer(x=> x+1,0);
  return (
    <div>
        <Navbar />
        <div className="idea-design">    
            <div className="container card bg-dark">
              <div className="m-4">
                <i style={{cursor:"pointer", float:"right", color:"white"}} className="bi bi-building-fill-add" onClick={() => setButtonPopup(true)}></i>
              <br/>
              <div className="row">
            {GetData("ideas", value).map((idea,index) => 
              <div className="col-6" key={index}>
                {ideaCard(idea)}
              </div>
              )}
              </div>
              </div>

          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <form  onSubmit={(event) => {
              addIdea(event, setValue);
              setButtonPopup(false);
            }}>
            <div>
              <input className="form-control" type="text" id="fidea" name="fidea" placeholder="Type the idea name"/>
              <input className="form-control" type="text" id="fided" name="fidead" placeholder="Type the idea description"/>
              <button style={{marginLeft: "45%", marginTop: 20}} type="submit" className="btn btn-primary mb-2">Submit</button>
            </div>
            </form>
          </Popup>


            </div>
            </div>
        </div>
  
  )
}

export default Idea
