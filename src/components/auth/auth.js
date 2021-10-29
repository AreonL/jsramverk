import React, { useEffect, useState } from "react";
import { AUTH_URL } from '../../config';

function Auth(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const search = window.location.search;
    let url = new URLSearchParams(search);
    const params = url.get("regEmail");

    useEffect(() => {
        if (params != null) {
            setEmail(params)
        }
    }, [params])

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
        const data = {
            email: email,
            password: password
        }

        let res = await authFetch("/login", data);

        if (!res) {
            return false
        }
        if (res.hasOwnProperty("data")) {
            props.onToken(res.data.token);
        }
        props.onEmail(email);
    }

    const onRegister = async () => {
        const data = {
            email: email,
            password: password
        }
        let res = await authFetch("/register", data);

        if (res.hasOwnProperty("data")) {
            res = await authFetch("/login", data);
            props.onToken(res.data.token);
        } else {
            if (res.errors.title === "Email already registered") {
                res = await authFetch("/login", data);
                props.onToken(res.data.token);
            }
        }
        props.onEmail(email);
        url.delete('regEmail')
    }

    return (
        <div className="auth">
            <h1>Login/Register</h1>
            <label>Email:</label>
            <input type="email" value={email} onInput={e => setEmail(e.target.value.toLowerCase())}></input>
            <label>Password:</label>
            <input type="text" value={password} onInput={e => setPassword(e.target.value)}></input>
            <button className="authButton blue" onClick={onLogin}>Login</button>
            <button className="authButton not-blue" onClick={onRegister}>Register</button>
        </div>
    );
}

export default Auth;