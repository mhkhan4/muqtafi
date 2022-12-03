import React, {useReducer} from "react";
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
    return (
      <div style={{float:"right"}}><span className="name badge badge-pill bg-primary">Learning</span></div>
    );
  }
  else{
    return (
      <div style={{float:"right"}}><span className="name badge badge-pill bg-warning">Working</span></div>
    );
  }
}

const card = (item) => {
  return(
			<div>
				<div className="px-3 pt-3">
					<p className="name">{item.content[0]}</p>
					<p style={{backgroundColor:"#884EA0", padding: 2}} className="quote2 wrappers card">{item.content[2]}</p>
				</div>
        
				<div className="d-flex justify-content-between  px-3 align-items-center pb-3">
          {learningWorking(item.content[3])}
          <div className="d-flex justify-content-end">
					  {getInitials(item.content[1])}
				  </div>
					<div className="d-flex justify-content-start align-items-center">
            <span style={{
              float: "left",
              width: 25,
              height: 25,
              backgroundColor: "#BA4A00",
              color: "#212F3D"
            }}
            className="pl-2 rounded-circle">{`${item.content[4]}`}</span>
				  </div>
				  
				</div>

		</div>

 
  );
}

const onDragEnd = (result, setValue) => {
  if (!result.destination) return;
  const { draggableId, destination } = result;
  const taskId = parseInt(draggableId);

  let ready = false;
  let progress = false;
  let done= false;

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
  })
  .then(function(response){
    console.log(response);
    setValue();
})
};

function DragAndDrop(id) {
  const [value, setValue] = useReducer(x=> x+1,0);
  const board = useGetData("tasks/board/" + id, value);
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, setValue)}
      >
        {Object.entries(board).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "stretch"
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
                          minHeight: "1000px"
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