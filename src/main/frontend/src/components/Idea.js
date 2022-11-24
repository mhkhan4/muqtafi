import React from 'react';
import GetData from '../restApiMethods/GetData';
import Navbar from './Navbar';
import "./Idea.css"


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



function Idea() {

  return (
    <div>
        <Navbar />
        <div className="idea-design">    
            <div className="container card bg-dark">
              <br/>
              <div className="m-4">
              <div className="row">
            {GetData("ideas").map((idea,index) => 
              <div className="col-6" key={idea.ideaId}>
                {ideaCard(idea)}
              </div>
              )}
              </div>
              </div>
            </div>
            </div>
        </div>
  
  )
}

export default Idea
