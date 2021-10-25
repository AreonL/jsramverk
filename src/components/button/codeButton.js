import React from "react";

function CodeMode(props) {
	const onCode = () => {
		console.log("Swapping To Code");
        props.onCode(true)
	}

    return (
		<button className="saveButton red" onClick={onCode}>Code Mode</button>
    );
}

export default CodeMode;