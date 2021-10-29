import EditorQuill from "../quill";
import Auth from "./auth";
import { useState } from 'react';
import EditorCode from "../codeEditor/codeEditor";

function AuthCheck() {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(false);

    return (
        <div>
            {email === "emil" ?
                <header className="App-header code-bg">
                    <EditorCode onEmil={email} onLogout={setToken} onCode={setCode} token={token}/>
                </header> :
                token.length > 0 ?
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
                </header>
            }
        </div>
    );
}

export default AuthCheck;
