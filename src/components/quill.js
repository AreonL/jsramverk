import React, { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import SaveButton from "./button/saveButton";
import Document from "./documents";
import EditorReactQuill from "./reactQuill";
import AllowUser from "./allowUser";
import Logout from "./button/logout";
import InviteButton from "./button/inviteButton";


// import moduleDocument from "../module/document";

// Kmom04 - Sockets
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../config";
import CodeMode from "./button/codeButton";

const socket = socketIOClient(ENDPOINT);


export default function EditorQuill(props) {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [old_id, setOldId] = useState('');
    const [new_text, setNewText] = useState('');
    const [text, setText] = useState('<p>Starting text..</p>');
    // Krav3 Komments
    const [selection, setSelection] = useState({});
    const [comments, setComments] = useState([]);
    const [add, addComment] = useState([]);
    const [saveText, onSaveText] = useState('');
    const [editor, setEditor] = useState({});

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
	// // }
    // const setComments = (e) => {
    //     console.log(e, "comments");
	// }

    // setComments={setComments} / savebutton
    return (
        <div id="quillEditor" data-testid="test-all">
            <Document onId={createAndSetId} email={props.email} onText={setText} onName={setName} PDFText={text} new_text={new_text} token={props.token} onComments={setComments}/>
            <EditorReactQuill onComments={setComments} setEditor={setEditor} onSaveText={onSaveText} id={id} addComment={add} token={props.token} comment={comments} value={text} onChange={setText} onKeyUp={keyUp} onSelection={setSelection} selection={selection}/>
            <SaveButton saveText={saveText} addComment={addComment} comment={comments} setText={setText} onSaveAs={setNewText} setId={setId} value={text} id={id} name={name} token={props.token} selection={selection}/>
            <AllowUser token={props.token} docId={id}/>
            <InviteButton token={props.token} name={name} fromEmail={props.email} docId={id}/>
            <div>
                <Logout onLogout={props.onLogout} onCode={props.onCode} token={props.token}/>
                <CodeMode onCode={props.onCode} />
            </div>
        </div>
    );
}
