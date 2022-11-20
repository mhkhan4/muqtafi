import Navbar from "./Navbar";
import "./Idea.css";
import useGetData from "../restApiMethods/GetData";
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
          <p style={{display : 'inline', paddingLeft: '10px', paddingTop: '25px'}} id={taskId}>{description}</p>
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
    return (
      <div>
          <div className="row border border-secondary">
          <div className="col">
          {data.map((task, index) => {
          return (
                <div key={index}>
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
  return (
    <div>
      <Navbar />
      <div className="idea-design">
        <div className="container">
          {ideas.map(idea => {
            return <div style={{paddingTop:'20px'}}key={idea.ideaId}>
              <h2>{idea.ideaName}</h2>
              <Task id={idea.ideaId} key={idea.ideaId} />
              </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default Tasks;

