import './App.css';
import Navbar from "./components/Navbar";
import "./components/Idea.css"
import GetData from "./restApiMethods/GetData";

function App() {
  function userTasks(e){
    console.log(e.target.id);
  }
  return(
  <div className="App">
    <Navbar />
    <div className="idea-design">
      {
        GetData("users").map(user => {
          let userArray = user.userName.split(" ");
          let initials = userArray[0][0];
          initials+= userArray[userArray.length - 1][0]
          return(
            <div id={user.userId} className="test rounded-circle" onClick={(e) => userTasks(e)}>{initials}</div>
          )
          })}
    </div>
  </div>
  );
}

export default App;
