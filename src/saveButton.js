// import { response } from "express";
import React from "react";

function SaveButton(props) {
	console.log(props.value, props.id, props.name);
	const saveAs = async () => {
		var new_name = prompt("Spara som..")
		console.log("New Name:", new_name);
		const data = {
			name: new_name,
			text: props.value
		}
		console.log("Saving this as new", data);

		await fetch('https://jsramverk-editor-arba20.azurewebsites.net/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(data => console.log('Success:', data))
		.catch(error => console.log('Error:', error));

		props.onSaveAs(props.value)
	}
    const saveLog = async () => {
		const data = {
			_id: props.id,
			text: props.value
		}
		console.log("Updating this", data);

		await fetch('https://jsramverk-editor-arba20.azurewebsites.net/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(data => console.log('Success:', data))
		.catch(error => console.log('Error:', error));

		props.onSaveAs(props.value)
    }
    return (
		<div>
			<button className="saveButton" onClick={saveLog}>Save</button>
			<button className="saveButton" onClick={saveAs}>Spara som</button>
		</div>
    );
}

export default SaveButton;