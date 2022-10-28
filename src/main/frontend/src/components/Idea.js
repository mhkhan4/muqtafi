import React from 'react';
import GetData from '../restApiMethods/GetData';
import Navbar from './Navbar';
import "./Idea.css"



function Idea() {

  return (
    <div>
        <Navbar />
        <div className="idea-design">    
            <div className="container">
            {GetData("ideas").map((idea,index) => 
              <div key={index} className="row border border-secondary">
                <div className="col">
                    <h3>{idea.ideaName}</h3>
                    <p>{idea.ideaDescription}</p>
                </div>
              </div>
              )}
            </div>
            </div>
        </div>
  
  )
}

export default Idea
