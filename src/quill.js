import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SaveButton from "./saveButton";

function EditorQuill() {
  const [value, setValue] = useState('');

  return (
    <div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <SaveButton value={value}/>
    </div>
  );
}

export default EditorQuill;