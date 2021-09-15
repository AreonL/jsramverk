import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SaveButton from "./saveButton";
import Documents from "./documents";
// import moduleDocument from "../module/document";

function EditorQuill() {
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [new_text, setNewText] = useState('');

    const setInfo = (document) => {
		setId(document._id);
        setText(document.text);
        setName(document.name);
	}

    return (
        <div>
            <Documents onSelect={setInfo} new_text={new_text}/>
            <ReactQuill theme="snow" value={text} onChange={setText} />
            <SaveButton onSaveAs={setNewText} value={text} id={id} name={name}/>
        </div>
    );
}

export default EditorQuill;