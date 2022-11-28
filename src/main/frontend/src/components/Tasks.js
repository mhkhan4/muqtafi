import Navbar from "./Navbar";
import "./Idea.css";
import useGetData from "../restApiMethods/GetData";
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import React, {useState}  from "react";
import Popup from "./Popup";

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

const addTask = (e, id) =>{
  e.preventDefault();

  var taskD = e.target[0].value;
  var l = e.target[1].checked;
  var w = e.target[2].checked;

  axios.post('http://localhost:8080/api/tasks', {
      taskDescription: taskD,
      learning: l,
      working: w,
      idea:{
        ideaId:id
      }
  })
  .then(function(response){
      console.log(response);
  })
  .catch(function(error){
      console.log(error);
  });

}

function DropdownMenu(taskId,description,users){
  return(
    <div value={description}>
      <Dropdown>
        <Dropdown.Toggle style={{color:"#ECF0F1"}} variant="white" id="dropdown-basic"></Dropdown.Toggle>
          <p style={{display : 'inline', paddingLeft: '10px', paddingTop: '25px', color:"#ECF0F1"}} id={taskId}>{description}</p>
        <Dropdown.Menu>
          {
            users.map(user =>{
              return <Dropdown.Item key={user.userId} id={user.userId} onClick={(e) => AssignTask(e)}>{user.userName}</Dropdown.Item>
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
    return (
      <div>
          <div className="row">
          <div className="col">
          {data.map((task) => {
          return (
            <div key={task.taskId}>
                {DropdownMenu(task.taskId, task.taskDescription, users)}
            </div>
          );     
        })}
        </div>
            </div>
      </div>
    );
  }

function Tasks() {
  const ideas = useGetData("ideas");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [assignedId, setAssignedId] = useState(0);
  return (
    <div>
      <Navbar />
      <div className="idea-design">
        <div className="container card" style={{backgroundColor:"black"}}>
          <br/>
          {ideas.map(idea => {
            return (
              <div className="card" style={{backgroundColor:"#0B5345"}} key={idea.ideaId}>  
                <div style={{marginRight:"2%"}}>
                  <i id={idea.ideaId} value={idea.ideaId} style={{cursor:"pointer", display:"inline",float:"right", color:"#D0D3D4"}} className="bi bi-building-fill-add" onClick={(e) => {setButtonPopup(true); setAssignedId(parseInt(e.target.parentElement.parentElement.children[0].children[0].id));}}></i>
                </div>
                <h2 style={{color:"white"}}>{idea.ideaName}</h2>
                <Task id={idea.ideaId} key={idea.ideaId} />

                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                  <form onSubmit={(event) => {
                      addTask(event, assignedId);
                      setButtonPopup(false);
                      window.location.reload(); 
                  }}>
                    <br/>
                    <div className="form-group row">
                      <label htmlFor="taskDescription" className="col-sm-2 col-form-label">Task</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputEmail3" placeholder="Task Description"/>
                      </div>
                    </div>
                    
                    <label htmlFor="taskDescription" className="col-sm-2 col-form-label">Label</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Learning"/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                          Learning
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Working"/>
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                          Working
                        </label>
                      </div>
                    <button style={{marginLeft: "45%", marginTop:"15px"}} type="submit" className="btn btn-primary mb-2">Submit</button>

                  </form>
                </Popup>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Tasks;

