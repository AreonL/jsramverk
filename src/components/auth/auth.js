import React, { useState } from "react";
import { AUTH_URL } from '../../config';

function Auth(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // const setText = (event) => {
    //     props.onChange(event)
    // }

    const authFetch = async (where, data) => {
		return await fetch(AUTH_URL + where, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.catch(error => console.log('Error:', error));
	}

    const onLogin = async () => {
        console.log("Eyo");
        const data = {
            email: email,
            password: password
        }

        let res = await authFetch("/login", data);
        // .then(data => data.da)

        if (res.hasOwnProperty("data")) {
            console.log(res.data, "logged in");
            props.onToken(res.data.token);
        }
        props.onEmail(email);
        console.log(res, password);
    }

    const onRegister = async () => {
        console.log("Eyo2");
        const data = {
            email: email,
            password: password
        }
        let res = await authFetch("/register", data);


        if (res.hasOwnProperty("data")) {
            console.log(res.data.message);
            res = await authFetch("/login", data);
            console.log(res, "Logged in with registy");
            props.onToken(res.data.token);
        } else {
            console.log(res);
            if (res.errors.title === "Email already registered") {
                res = await authFetch("/login", data);
                console.log(res, "Logged in, already registered");
                props.onToken(res.data.token);
            }
        }
        props.onEmail(email);
        console.log(res, password);
    }

    return (
        <div className="auth">
            <h1>Login/Register</h1>
            <label>Email:</label>
            <input type="email" onInput={e => setEmail(e.target.value.toLowerCase())}></input>
            <label>Password:</label>
            <input type="text" onInput={e => setPassword(e.target.value)}></input>
            <button className="authButton blue" onClick={onLogin}>Login</button>
            <button className="authButton not-blue" onClick={onRegister}>Register</button>
        </div>
    );
}

export default Auth;