import React, { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import SaveButton from "./saveButton";
import Document from "./documents";
import EditorReactQuill from "./reactQuill";
// import moduleDocument from "../module/document";

// Kmom04 - Sockets
import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:4000";
const ENDPOINT = "https://jsramverk-editor-arba20.azurewebsites.net";
const socket = socketIOClient(ENDPOINT);


function EditorQuill() {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [old_id, setOldId] = useState('');
    const [new_text, setNewText] = useState('');
    const [text, setText] = useState('<p>Starting text..</p>');

    let data = {
        _id: id,
        html: text
    }

    // Actual god like function
    function keyUp() {
        socket.emit("message", data);
    }

    // First leave with id, then create with new id
    function createAndSetId(id) {
        socket.emit("leave", old_id);
        setOldId(id)
        socket.emit("create", id);
        setId(id)
    };

    // From api -> all clients
    socket.on("message", (data) => {
        setText(data.html);
    });

    // Same goes here, we can fetch from all docs when this gets called
    socket.on("new_text", (new_text) => {
        setNewText(new_text)
    });
    // const setInfo = (document) => {
	// 	setId(document._id);
    //     setText(document.text);
    //     setName(document.name);
	// }

    return (
        <div id="quillEditor" data-testid="test-all">
            <Document onId={createAndSetId} onText={setText} onName={setName} new_text={new_text}/>
            <EditorReactQuill value={text} onChange={setText} onKeyUp={keyUp}/>
            <SaveButton onSaveAs={setNewText} value={text} id={id} name={name}/>
        </div>
    );
}

export default EditorQuill;