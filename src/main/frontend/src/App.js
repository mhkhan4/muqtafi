import './App.css';
import Navbar from "./components/Navbar";
import "./components/Idea.css"
import GetData from "./restApiMethods/GetData";
import DrugAndDrop from './components/DragAndDrop';


function userTasks(e){
  console.log(e.target.id);
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
      <h3 id="learning">Learning</h3>
      <DrugAndDrop />
        {/* {
        taskList.map(task =>{
          return(
            task.user !== null &&
            task.learning === true &&
            <DrugAndDrop />
          )
        })
        } */}
      
    </div>
  );
}

function App() {
  return(
  <div className="App">
    <Navbar />
    <div className="idea-design">
      {userList()}
      {homePage()}
    
    </div>
  </div>
  );
}

export default App;
