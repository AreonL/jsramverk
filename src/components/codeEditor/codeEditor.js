import React, { useState } from "react";
import MonacoEditor from 'react-monaco-editor';
import Logout from "../button/logout";
import EditorMode from "./button/editorButton";
import SaveCode from "./button/saveCode";
import Codes from "./codes";

function EditorCode(props) {
    const [code, setCode] = useState('// Start coding..');
    const [newCode, setNewCode] = useState('');
    const [id, setId] = useState('');
    const options = {
        selectOnLineNumbers: false
    };

    function onChange(newValue, e) {
        setCode(newValue);
    }

    return (
        <div>
            <Codes token={props.token} code={code} newCode={newCode} setId={setId} setCode={setCode}/>
            <div className="notextalign">
                <MonacoEditor
                    width="800"
                    height="600"
                    language="javascript"
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={onChange}
                />
            </div>
            <SaveCode code={code} id={id} token={props.token} setNewCode={setNewCode}/>
            <div>
                <Logout onLogout={props.onLogout} onCode={props.onCode} token={props.token}/>
                <EditorMode onCode={props.onCode} />
            </div>
        </div>
    );
}

export default EditorCode;