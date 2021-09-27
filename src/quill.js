import React, { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import SaveButton from "./saveButton";
import Document from "./documents";
import EditorReactQuill from "./reactQuill";
// import moduleDocument from "../module/document";

// Kmom04 - Sockets
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";

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

    useEffect(() => {
        socket.emit("message", data);
        // eslint-disable-next-line
    }, [text])

    // useEffect(() => {
    //     socket.emit("leave", old_id);
    //     setOldId(id)
    // }, [id])

    // useEffect(() => {
    //     // socket.emit("leave", old_id);
    //     socket.emit("create", id);
    // }, [id])

    function createAndSetId(id) {
        console.log(id);
        socket.emit("leave", old_id);
        setOldId(id)
        socket.emit("create", id);
        setId(id)
    };

    socket.on("message", (data) => {
        console.log("Data updated here", data);
        setText(data.html);
    });
    // const setInfo = (document) => {
	// 	setId(document._id);
    //     setText(document.text);
    //     setName(document.name);
	// }

    return (
        <div data-testid="test-all">
            <Document onId={createAndSetId} onText={setText} onName={setName} new_text={new_text}/>
            <EditorReactQuill value={text} onChange={setText} />
            <SaveButton onSaveAs={setNewText} value={text} id={id} name={name}/>
        </div>
    );
}

export default EditorQuill;