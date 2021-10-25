import React from "react";

function EditorMode(props) {
	const onCode = () => {
		console.log("Swapping To Editor");
        props.onCode(false)
	}

    return (
		<button className="saveButton red" onClick={onCode}>Editor Mode</button>
    );
}

export default EditorMode;