import EditorQuill from "../quill";
import Auth from "./auth";
import { useState } from 'react';
import EditorCode from "../codeEditor/codeEditor";
// import { AUTH_URL } from './config';

function AuthCheck() {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(false);

    // useEffect(() => {
    //     // console.log("useEffect");
    //     // fetch(AUTH_URL)
    //     //     .then(res => res.json())
    //     //     .then(data => {
    //     //         console.log("data:", data);
    //     //         setToken(data);
    //     //     });
    // }, [])

    return (
        <div>
            {/* {console.log(token)} */}

            {token.length > 0 ?
            <div>
                { code === true ?
                <header className="App-header code-bg">
                    <EditorCode onLogout={setToken} onCode={setCode} token={token}/>
                </header>
                :
                <header className="App-header">
                    <EditorQuill token={token} onLogout={setToken} onCode={setCode} email={email}/>
                </header>
                }
            </div> :
            <header className="App-header">
                <Auth onToken={setToken} onEmail={setEmail}/>
            </header>}
        </div>
    );
}

export default AuthCheck;
