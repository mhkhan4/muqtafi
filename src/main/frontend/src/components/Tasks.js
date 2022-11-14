import Navbar from "./Navbar";
import "./Idea.css";
import useGetData from "../restApiMethods/GetData";
import React, {useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";

function AssignTask(e){
  e.preventDefault();
  let user_id = e.target.id;
  let taskId = e.target.parentElement.parentElement.getElementsByTagName("P")[0].id;
  
  axios.put('http://localhost:8080/api/tasks/' + taskId, {
    user:{
      userId:user_id
    }
    });
}

function DropdownMenu(taskId,description,users){
  return(
    <div value={description}>
      <Dropdown>
        <Dropdown.Toggle variant="info" id="dropdown-basic"></Dropdown.Toggle>
        <p id={taskId}>{description}</p>
        <Dropdown.Menu>
          {
            users.map(user =>{
              return <Dropdown.Item id={user.userId} onClick={(e) => AssignTask(e)}>{user.userName}</Dropdown.Item>
            })
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>

    
  );
}

function Task({ id }) {
  
    const data = useGetData(`ideas/${id}`);
    const users = useGetData("users");
    let newIdeaName = [];
    return (
      <div>
          <div className="row border border-secondary">
          <div className="col">
          {data.map((task,index) => {
          return (
                <div key={index}>
                  {
                    newIdeaName.includes(task.idea.ideaName) === false ?
                    <div key={index}>
                      <h2>{task.idea.ideaName}</h2>
                      {DropdownMenu(task.taskId, task.taskDescription, users)}
                      {newIdeaName.push(task.idea.ideaName)}
                    </div>
                  :
                    <div key={index}>
                      {DropdownMenu(task.taskId, task.taskDescription,users)}
                    </div>
                  }
                </div>
          );
                
        })}
        </div>
            </div>
      </div>
    );
  }
  

function Tasks() {
  const ids = useGetData("ideas/id");
  return (
    <div>
      <Navbar />
      <div className="idea-design">
        <div className="container">
          {ids.map(id => {
            return <Task id={id} key={id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Tasks;

