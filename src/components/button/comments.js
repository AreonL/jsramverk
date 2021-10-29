import React from "react";

export default function Comments(props) {
    // Just button to add to comment
    return (
        <button className="saveButton" onClick={props.addComment}>Comment</button>
    );
}

