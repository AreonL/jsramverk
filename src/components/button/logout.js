// import { response } from "express";
import React from "react";
// import { API_URL } from "./config";

function Logout(props) {
	const onLogout = async () => {
		console.log("Logging out");
        props.onLogout("")
	}

    return (
		<div>
			<button className="saveButton red" onClick={onLogout}>Logout</button>
		</div>
    );
}

export default Logout;