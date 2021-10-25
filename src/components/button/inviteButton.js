import React from "react";
import { AUTH_URL, API_URL } from '../../config'

function InviteButton(props) {
	const onInvite = async () => {
		let email = prompt("Who's email?");

        if (email === null) {
			return false;
		}
        email = email.toLowerCase()

        const dataEmail = {
            toEmail: email,
            fromEmail: props.fromEmail,
            docName: props.name
        }
        const dataAllow = {
            addEmail: email,
            docId: props.docId
        }

		fetch(AUTH_URL + '/invite', {
			method: 'POST',
			headers: {
				'x-access-token': props.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dataEmail),
		})
		.then(response => response.json())
		.then((data) => {
            if (data.data.message !== "Email sent") {
                return false;
            }
            fetch(API_URL + "/allow", {
                method: 'POST',
                headers: {
                    'x-access-token': props.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataAllow),
	    	})
            .then(response => response.json())
            .catch(error => console.log('Error:', error))
        }
        )
		.catch(error => console.log('Error:', error));
	}

    return (
		<button className="saveButton green" onClick={onInvite}>Invite</button>
    );
}

export default InviteButton;