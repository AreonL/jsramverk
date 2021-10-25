import React from "react";
// import { API_URL } from "../../../config";


export default function ExecuteCode(props) {
    const sendCode = async () => {
        console.log("Save code", props.code);
        // Buffer.from(str, 'base64') and buf.toString('base64')
        /*
        let count = 0;

        function hello(arg) {
            count += 1
            console.log(arg + String(count));
        }

        hello("Hello");
        */
       console.log(props.code);
        const data = {
            code: btoa(props.code)
        };
        // code: 'console.log("hej");'.toString('base64')

        fetch("https://execjs.emilfolino.se/code", {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(function (response) {
            return response.json();
        })
        .then(result => {
            let decodedOutput = atob(result.data);
            console.log(decodedOutput); // outputs: hej
            alert(decodedOutput);
        })
        .catch(e => console.log(e));
        // const output = "Works 100%";

        // alert(output);
    }
    return (
		<button className="codeButton green" onClick={sendCode}>Play</button>
    );
}