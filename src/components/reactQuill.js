import React, { useState } from "react";
import ReactQuill from "react-quill";
import DisplayComments from "./displayC";

export default function EditorReactQuill(props) {
    const [range, setRange] = useState({});
    const [editor, setEditor] = useState({});
    // Get's both text and the editor
    // setEditor is for comments
    // onChange is for rest :P
    const setText = (event, a, b, editor2) => {
        setEditor(editor2)
        props.onChange(event)
    }

    // Socket io
    const keyUp = (event) => {
        props.onKeyUp(event)
    }

    // Used for comments, check if user did select or not
    // otherwise might crash or not create
    const selection = (range, source, editor) => {
        if (source === 'user') {
            setRange(range)
        }
    }

    return (
        <div className="quill-comment">
            <ReactQuill theme="snow" value={props.value} onChange={setText} onKeyUp={keyUp} onChangeSelection={selection}/>
            <DisplayComments onComments={props.onComments} onRange={range} onEditor={editor} onSaveText={props.onSaveText} id={props.id} addComment={props.addComment} token={props.token} comment={props.comment} firstComment={props.value} selection={props.selection} onText={props.onChange}/>
        </div>
    );
}
