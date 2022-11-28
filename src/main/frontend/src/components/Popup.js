import React from 'react';
import "./Popup.css"

function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
         <div className='popup-inner'>
            <i style={{cursor:"pointer", float:"right"}} class="bi bi-x-lg" onClick={()=> props.setTrigger(false)}></i>
            { props.children }
         </div>
    </div>
  ) : "";
}

export default Popup