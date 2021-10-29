import React, { useEffect } from "react";
import Comments from "./comments";
import { API_URL } from "../../config";

export default function SaveButton(props) {
	const saveFetch = async (where, data) => {
		return await fetch(API_URL + where, {
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

	const saveAs = async () => {
		var new_name = prompt("Spara som..")

		if (new_name.length === 0) {
			return
		}

		const data = {
			name: new_name,
			text: props.value,
			comments: props.comment
		}

		let val = await saveFetch("/create", data);
		props.onSaveAs(props.value);
		props.setId(val.data.id);
	}
    const saveLog = async () => {
		const data = {
			_id: props.id,
			text: props.value
		}

		await saveFetch("/update", data);

		props.onSaveAs(props.value)
    }

	const updateCommentText = async (text) => {
		if (!text) {
			return false
		}
		console.log("passed -- updating w/ comments");
		const data = {
			_id: props.id,
			text: text
		}

		await saveFetch("/update", data);

		props.onSaveAs(text)
		props.setText(text)
    }

	useEffect(() => {
		const values = props.saveText;
		if (values.length !== 0) {
			console.log("Saving soon");
			updateCommentText(values)
		}
	}, [props.saveText]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
		<div>
			<button className="saveButton" data-testid="saveTest" onClick={saveLog}>Save</button>
			<button className="saveButton" data-testid="saveAsTest" onClick={saveAs}>Save as</button>
			<Comments addComment={props.addComment} token={props.token} id={props.id} selection={props.selection} setText={updateCommentText} />
		</div>
    );
}
