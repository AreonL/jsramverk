import React, { useState, useEffect } from "react";
import ReactQuill, {Quill} from "react-quill";
import DisplayComments from "./displayC";
// import Parchment from 'parchment';
// class LinkBlot {
//     static create(url) {
//       let node = super.create();
//       node.setAttribute('href', url);
//       node.setAttribute('target', '_blank');
//       node.setAttribute('title', node.textContent);
//       return node;
//     }

//     static formats(domNode) {
//       return domNode.getAttribute('href') || true;
//     }

//     format(name, value) {
//       if (name === 'link' && value) {
//         this.domNode.setAttribute('href', value);
//       } else {
//         super.format(name, value);
//       }
//     }

//     formats() {
//       let formats = super.formats();
//       formats['link'] = LinkBlot.formats(this.domNode);
//       return formats;
//     }
// }
// LinkBlot.blotName = 'link';
// LinkBlot.tagName = 'A';

// Quill.register(LinkBlot);

export default function EditorReactQuill(props) {
    const [range, setRange] = useState({});
    const [editor, setEditor] = useState({});


    const setText = (event, a, b, editor2) => {
        // console.log(editor);
        // console.log(event, editor, b, c);
        // console.log(editor.getContents());
        // console.log(editor.getSelection());
        // console.log(editor2.getContents());
        setEditor(editor2)
        props.onChange(event)
    }

    const keyUp = (event) => {
        props.onKeyUp(event)
    }

    // const selection = (range, source, editor) => {
        // console.log(range, source, editor);
        // console.log(
        //     // editor.getBounds(),
        //     source,
        //     editor.getContents(),
        //     editor.getHTML(),
        //     editor.getLength(),
        //     editor.getSelection(),
        //     editor.getText(),
        // );
        // getBounds: ƒ ()
        // getContents: ƒ ()
        // getHTML: ƒ ()
        // getLength: ƒ ()
        // getSelection: ƒ ()
        // getText: ƒ ()


        // let text = editor.getText();
        // LinkBlot.create(text)
        // console.log(text);
        // // // console.log(range.index, range.length);
        // // console.log(text);
        // // // console.log(editor.getText());
        // // console.log(props.value);
        // if (range) {
        //     // text = text.formatText(range.index, range.length, {
        //     //     'bold': true
        //     // })

        //     // props.onSelection({range, source, editor})
        //     // setFormat()
        // }
    // }

    const selection = (range, source, editor) => {
        // console.log(editor.getSelection());
        if (source === 'user') {
            setRange(range)
        }
        // setSelection(editor)
    }

    // const setComments = () => {
    //     let com = comments;
    //     com.push("1")
    //     setComment(com);
    // }

    // useEffect(() => {
    //     console.log(props.comment);
    // }, [props.comment]);

    return (
        <div className="quill-comment">
            <ReactQuill theme="snow" value={props.value} onChange={setText} onKeyUp={keyUp} onChangeSelection={selection}/>
            <DisplayComments onComments={props.onComments} onRange={range} onEditor={editor} onSaveText={props.onSaveText} id={props.id} addComment={props.addComment} token={props.token} comment={props.comment} firstComment={props.value} selection={props.selection} onText={props.onChange}/>
            {/* { console.log(comments) }
            { comments.length > 0 ?
                <div className="comments">{
                    comments.map(e => <div key={e.text}>{e.text}</div>)
                }</div>
            :
            <div className="no-comments"></div>
            } */}
            {/* <div className="comments" onClick={setComments}>Comments</div> */}
        </div>
    );
}
