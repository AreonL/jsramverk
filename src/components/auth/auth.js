import React, { useEffect, useState } from "react";
import { AUTH_URL } from '../../config';
// import { useQuery } from 'react-query';



// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

function Auth(props) {
    const [email, setEmail] = useState('t');
    const [password, setPassword] = useState('t');
    const search = window.location.search;
    let url = new URLSearchParams(search);
    const params = url.get("regEmail");

    useEffect(() => {
        if (params != null) {
            setEmail(params)
        }
    }, [params])
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
        //console.log("Eyo");
        const data = {
            email: email,
            password: password
        }

        let res = await authFetch("/login", data);
        // .then(data => data.da)

        if (res.hasOwnProperty("data")) {
            //console.log(res.data, "logged in");
            props.onToken(res.data.token);
        }
        props.onEmail(email);
        // window.location.href = "http://localhost:3000"
        //console.log(res, password, email);
    }

    const onRegister = async () => {
        //console.log("Eyo2");
        const data = {
            email: email,
            password: password
        }
        let res = await authFetch("/register", data);


        if (res.hasOwnProperty("data")) {
            //console.log(res.data.message);
            res = await authFetch("/login", data);
            //console.log(res, "Logged in with registy");
            props.onToken(res.data.token);
        } else {
            //console.log(res);
            if (res.errors.title === "Email already registered") {
                res = await authFetch("/login", data);
                //console.log(res, "Logged in, already registered");
                props.onToken(res.data.token);
            }
        }
        props.onEmail(email);
        url.delete('regEmail')
        //console.log(res, password);
    }

    return (
        <div className="auth">
            <h1>Login/Register</h1>
            <label>Email:</label>
            <input type="email" value={email} onInput={e => setEmail(e.target.value.toLowerCase())}></input>
            <label>Password:</label>
            <input type="text" value={email} onInput={e => setPassword(e.target.value)}></input>
            <button className="authButton blue" onClick={onLogin}>Login</button>
            <button className="authButton not-blue" onClick={onRegister}>Register</button>
        </div>
    );
}

export default Auth;