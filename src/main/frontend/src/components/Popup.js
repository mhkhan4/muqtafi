import React from 'react';
import "./Popup.css"

function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
         <div className='popup-inner square rounded p-5'>
            <i style={{cursor:"pointer", float:"right"}} className="bi bi-x-lg" onClick={()=> props.setTrigger(false)}></i>
            { props.children }
         </div>
    </div>
  ) : "";
}

export default Popup