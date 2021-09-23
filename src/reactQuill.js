import React from "react";

import ReactQuill from "react-quill";



function EditorReactQuill(props) {

    const setText = (event) => {
        props.onChange(event)
    }

    return (
        <ReactQuill theme="snow" value={props.value} onChange={setText} />
    );
}

export default EditorReactQuill;