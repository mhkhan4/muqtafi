import './App.css';
import Navbar from "./components/Navbar";
import "./components/Idea.css"
import GetData from "./restApiMethods/GetData";
import DrugAndDrop from './components/DragAndDrop';
import React, {useState, useReducer} from "react";
import Popup from "./components/Popup";
import axios from "axios";
import Cookies from 'universal-cookie';


// function UserTasks(e){
//   // user(e.target.id)
//   {DrugAndDrop(e.target.id)}

// }

const addUser = (e, setValue) =>{
  e.preventDefault();
  var name = e.target[0].value;

  axios.post('http://localhost:8080/api/users', {
      userName: name
  })
  .then(function(response){
    setValue();
    console.log(response);
  })
  .catch(function(error){
    console.log(error);
  });

}



function userList(value, cookies){
  return(
    <div>
      {
        GetData("users", value).map(user => {
          let userArray = user.userName.split(" ");
          let initials = userArray[0][0];
          initials+= userArray[userArray.length - 1][0]
          return(
            <div key={user.userId} id={user.userId} className="test rounded-circle" onClick={(e) => {
              cookies.get('myId') === e.target.id ? cookies.set('myId', 0 , { path: '/' }) :
              cookies.set('myId', e.target.id , { path: '/' });
          
              window.location.reload();
        
            }}>{initials}</div>
          )
          })}
    </div>
  );
}

function homePage(id){
  return(
    <div className='task-table'>
      {DrugAndDrop(id)}
    </div>
  );
}

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [value, setValue] = useReducer(x=> x+1,0);
  const cookies = new Cookies();


  return(
    <div>
  <div className="App">
    <Navbar />
    <div className="idea-design">
      {userList(value, cookies)}
      <i style={{float:"left", paddingLeft:"5px", cursor:"pointer"}} className="bi bi-person-fill-add" onClick={()=> setButtonPopup(true)}></i>
      {homePage(cookies.get('myId'))}
    </div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={(e) => {
            addUser(e, setValue);
            setButtonPopup(false);
        }}>
          <div>
            <input className="form-control" type="text" id="fuser" name="fuser" placeholder="Type the user name"/>
            <button style={{marginTop: 20}} type="submit" className="btn btn-primary mb-2">Submit</button>
          </div>
        </form>
</Popup>
</div>
  {
    cookies.get('myId') > 0 && document.getElementById(cookies.get('myId')) !== null ?
    document.getElementById(cookies.get('myId')).style.backgroundColor='red': console.log("")
  }

  </div>
  );
}

export default App;
