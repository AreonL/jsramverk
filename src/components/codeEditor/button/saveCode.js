import React from "react";
import { CODE_URL } from "../../../config";


export default function SaveCode(props) {
	const create = async () => {
        console.log("Save as code");
        const text = prompt("Name of code")


        const data = {
            name: text,
            code: props.code
        }

        fetch(CODE_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'x-access-token': props.token,
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            props.setNewCode(props.code);
        })
        .catch(e => console.log(e))
	}
    const update = async () => {
        console.log("Save code");

        const data = {
            id: props.id,
            code: props.code
        }

        fetch(CODE_URL, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'x-access-token': props.token,
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            props.setNewCode(props.code)
        })
    }
    return (
		<div>
			<button className="codeButton" data-testid="saveTest" onClick={update}>Save</button>
			<button className="codeButton" data-testid="saveAsTest" onClick={create}>Save as</button>
		</div>
    );
}