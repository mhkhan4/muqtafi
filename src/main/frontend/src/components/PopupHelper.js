import React from 'react'

function PopupHelper(buttonPopup,) {
  return (
    <div>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <form onSubmit={(event) => {
                AddRule(event);
                setButtonPopup(false);
                window.location.reload(); 
            }}>
                <div>
                    <input className="form-control" type="text" id="frule" name="frule" placeholder="Type the rule"/>
                    <button type="submit" class="btn btn-primary mb-2">Submit</button>
                </div>
            </form>
        </Popup>
    </div>
  )
}

export default PopupHelper