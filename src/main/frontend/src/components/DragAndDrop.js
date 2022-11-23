import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useGetData from "../restApiMethods/GetData";
import axios from "axios";
import '../App.css';

const getInitials = (user) => {
  let userArray = user.split(" ");
  let initials = userArray[0][0];
  initials+= userArray[userArray.length - 1][0]
  return(
    <div className="test rounded-circle">{initials}</div>
  )
}

const learningWorking = (boolVal) => {
  if(boolVal === "true"){
    return "learning";
  }
  else{
    return "working";
  }
}

const card = (item) => {
  let current = new Date();
  return(
			<div>
        <div style={{float:"right"}}><span className="name badge badge-pill bg-success">{learningWorking(item.content[3])}</span></div>
				<div className="px-3 pt-3">
					<h5 className="name">{item.content[0]}</h5>
					<p className="quote2">{item.content[2]}</p>
				</div>
				<div className="d-flex justify-content-between  px-3 align-items-center pb-3">
					<div className="d-flex justify-content-start align-items-center">
					<i className="mdi mdi-calendar-clock date"></i>
					<span className="quote2 pl-2">{`Date: ${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`}</span>
				</div>
				<div className="d-flex justify-content-end">
					{getInitials(item.content[1])}
				</div>
				</div>

		</div>

 
  );
}

const onDragEnd = (result) => {
  if (!result.destination) return;
  const { draggableId, source, destination } = result;
  const taskId = parseInt(draggableId);

  let ready = false;
  let progress = false;
  let done= false;

  if(source.droppableId === "1"){
    ready = false;
  }
  if(source.droppableId === "2"){
    progress = false;
  }
  if(source.droppableId === "3"){
    done = false;
  }

  if(destination.droppableId === "1"){
    ready = true;
  }
  if(destination.droppableId === "2"){
    progress = true;
  }
  if(destination.droppableId === "3"){
    done = true;
  }

  axios.put('http://localhost:8080/api/tasks/board/' + taskId, {
      "board":{
        "ready": ready,
        "progress" : progress,
        "done": done
      }
  });
  window.location.reload(); 
};

function DragAndDrop() {
  const board = useGetData("tasks/board");
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result)}
      >
        {Object.entries(board).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {card(item)}
                                
                                    {/* <h6>{item.content[0]}</h6>
                                    <p><small>{item.content[1]}</small></p> */}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default DragAndDrop;