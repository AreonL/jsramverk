// import { response } from "express";
import React from "react";

const BASE_URL = 'https://jsramverk-editor-arba20.azurewebsites.net/document/'

function SaveButton(props) {
	// console.log(props.value, props.id, props.name);
	const saveFetch = async (where, data) => {
		await fetch(BASE_URL + where, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.catch(error => console.log('Error:', error));
	}

	const saveAs = async () => {
		var new_name = prompt("Spara som..")
		// console.log("New Name:", new_name);
		if (new_name.length === 0) {
			return
		}
		const data = {
			name: new_name,
			text: props.value
		}

		await saveFetch("create", data);

		props.onSaveAs(props.value);
	}
    const saveLog = async () => {
		const data = {
			_id: props.id,
			text: props.value
		}

		await saveFetch("update", data);

		props.onSaveAs(props.value)
    }
    return (
		<div>
			<button className="saveButton" data-testid="saveTest" onClick={saveLog}>Save</button>
			<button className="saveButton" data-testid="saveAsTest" onClick={saveAs}>Spara som</button>
		</div>
    );
}

export default SaveButton;