// import { response } from "express";
import React from "react";
import { API_URL } from "./config";

function AllowUser(props) {
	const onAllow = async () => {
		var addEmail = prompt("Spara som..")
		if (addEmail.length === 0 || addEmail === null) {
			return false;
		}

		const data = {
			addEmail: addEmail.toLowerCase(),
			docId: props.docId
		}

        await fetch(API_URL + "/allow", {
			method: 'POST',
			headers: {
                'x-access-token': props.token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.catch(error => console.log('Error:', error));
	}

    return (
		<div>
			<button className="saveButton green" onClick={onAllow}>Add user</button>
		</div>
    );
}

export default AllowUser;