import React from "react";

import ReactQuill from "react-quill";



function EditorReactQuill(props) {

    const setText = (event) => {
        props.onChange(event)
    }

    const keyUp = (event) => {
        console.log();
        props.onKeyUp(event)
    }

    return (
        <ReactQuill theme="snow" value={props.value} onChange={setText} onKeyUp={keyUp}/>
    );
}

export default EditorReactQuill;