import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import GetData from '../restApiMethods/GetData';

function DrugAndDrop() {
    let board = GetData("tasks/board/learning");
    return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        <DragDropContext onDragEnd={result => console.log(result)}>
            {
                Object.entries(board).map((id, column) => {
                    console.log("olumn",column);
                    return (
                        <Droppable droppableId={id}>
                            {(provided, snapshot) => {

                            }}
                        </Droppable>
                    )
                })
            }
        </DragDropContext>
    </div>
  )
}

export default DrugAndDrop