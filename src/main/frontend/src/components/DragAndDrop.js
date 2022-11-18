import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import useGetData from "../restApiMethods/GetData";
import axios from "axios";


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
  const board = useGetData("tasks/board/learning");
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
                                    <h6>{item.content[0]}</h6>
                                    <p><small>{item.content[1]}</small></p>
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