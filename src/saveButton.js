import React from "react";

function SaveButton({ value }) {
    const saveLog = () => {
        console.log(value);
    }
    return (
      <button className="saveButton" onClick={saveLog}>Save</button>
    );
  }

  export default SaveButton;