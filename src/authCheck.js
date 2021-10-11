import EditorQuill from "./quill";
import Auth from "./auth";
import { useState } from 'react';
// import { AUTH_URL } from './config';

function AuthCheck() {
    const [token, setToken] = useState('');

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
            {console.log(token)}

            {token.length > 0 ?
            <header className="App-header">
                <EditorQuill token={token} onLogout={setToken}/>
            </header> :
            <header className="App-header">
                <Auth onToken={setToken}/>
            </header>}
        </div>
    );
}

export default AuthCheck;
