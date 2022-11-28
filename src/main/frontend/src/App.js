import './App.css';
import Navbar from "./components/Navbar";
import "./components/Idea.css"
import GetData from "./restApiMethods/GetData";
import DrugAndDrop from './components/DragAndDrop';
import React, {useState} from "react";
import Popup from "./components/Popup";
import axios from "axios";


function userTasks(e){
  console.log(e.target.id);
}

const addUser = (e) =>{
  e.preventDefault();
  var name = e.target[0].value;

  axios.post('http://localhost:8080/api/users', {
      userName: name
  })
  .then(function(response){
      console.log(response);
  })
  .catch(function(error){
      console.log(error);
  });

}



function userList(){
  return(
    <div>
      {
        GetData("users").map(user => {
          let userArray = user.userName.split(" ");
          let initials = userArray[0][0];
          initials+= userArray[userArray.length - 1][0]
          return(
            <div key={user.userId} id={user.userId} className="test rounded-circle" onClick={(e) => userTasks(e)}>{initials}</div>
          )
          })}
    </div>
  );
}

function homePage(){
  return(
    <div className='task-table'>
      <DrugAndDrop />
    </div>
  );
}

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  return(
  <div className="App">
    <Navbar />
    <div className="idea-design">
      {userList()}
      <i style={{float:"left", paddingLeft:"5px", cursor:"pointer"}} className="bi bi-person-fill-add" onClick={()=> setButtonPopup(true)}></i>
      {homePage()}
    </div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={(e) => {
            addUser(e);
            setButtonPopup(false);
            window.location.reload(); 
        }}>
          <div>
            <input className="form-control" type="text" id="fuser" name="fuser" placeholder="Type the user name"/>
            <button type="submit" class="btn btn-primary mb-2">Submit</button>
          </div>
        </form>
</Popup>
  </div>
  );
}

export default App;
