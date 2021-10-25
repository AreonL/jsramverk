import React from "react";

export default function Logout(props) {
	const onLogout = async () => {
		console.log("Logging out");
        props.onLogout("")
		props.onCode(false)
	}

    return (
		<button className="saveButton red" onClick={onLogout}>Logout</button>
    );
}