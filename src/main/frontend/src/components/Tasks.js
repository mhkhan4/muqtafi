import Navbar from "./Navbar";
import "./Idea.css";
import useGetData from "../restApiMethods/GetData";
import React from "react";

function Task({ id }) {
    const data = useGetData(`ideas/${id}`);
    return (
      <div>
        {data.map((task, index) => {
          return (
            <div key={index} className="row border border-secondary">
              <div className="col">
                <div>
                  <h1>{task.Idea.ideaId}</h1>
                  <p>{task.taskDescription}</p>
                </div>
              </div>
            </div>
          );
        })}
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
          {ids.map((id, index) => {
            return <Task id={id} key={id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Tasks;