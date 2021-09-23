import React, { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import SaveButton from "./saveButton";
import Document from "./documents";
import EditorReactQuill from "./reactQuill";
// import moduleDocument from "../module/document";

function EditorQuill() {
    const [text, setText] = useState('Type something..');
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [new_text, setNewText] = useState('');

    // const setInfo = (document) => {
	// 	setId(document._id);
    //     setText(document.text);
    //     setName(document.name);
	// }

    return (
        <div data-testid="test-all">
            <Document onId={setId} onText={setText} onName={setName} new_text={new_text}/>
            <EditorReactQuill value={text} onChange={setText} />
            <SaveButton onSaveAs={setNewText} value={text} id={id} name={name}/>
        </div>
    );
}

export default EditorQuill;