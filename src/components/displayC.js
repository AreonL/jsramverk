import Quill from "quill";
import Delta from "quill-delta";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { API_URL } from "../config";

export default function DisplayComments(props) {
    const [comments, setComments] = useState([]);
    const [count, setCount] = useState(0)

    const renewComments = (arg) => {
        console.log(arg);
        setComments(arg);
    }


    useEffect(() => {
        // let com = comments;
        // console.log(props.comment);

        let comment = "This is a comment";
        // console.log(props.comment);
        // console.log(comments);
        if (!props.comment) {
            // console.log("Toooooo");
            return false;
        }

        // com.push({text: props.comment})
        renewComments(props.comment)
    }, [
        props.comment,
        // comments,
        // props.firstComment
    ])

    useEffect(() => {
        // console.log(props.addComment);
        if (props.addComment.length !== 0) {
            console.log("Gonna add comment");
            addComment()
        }
    }, [props.addComment])

    const addComment = async () => {
        console.log("Added comment");
        const editor = props.onEditor;
        const range = props.onRange;
        let deltaString = editor.getContents();
        let new_count = count + 1
        let comment = `Added comment nr: ${new_count}`
        // console.log(deltaString, range);
        console.log(range);
        console.log(Object.keys(range).length);
        if (Object.keys(range).length === 0) {
            return false
        }
        if (range.length === 0) {
            return false
        }
        setCount(new_count);

        const death = new Delta().retain(range.index).retain(range.length, { background: 'cyan' })
        const restored = deltaString.compose(death);
        var converter = new QuillDeltaToHtmlConverter(restored.ops, {});
        var html = converter.convert();
        // console.log(html);

        var countChar = 0;
        var countComment = 0;
        converter.rawDeltaOps.map(e => {
            if (countChar >= range.index) {
                return
            }
            e.hasOwnProperty('attributes') ?
            e.attributes.hasOwnProperty('background') ?
            countComment += 1 :
            countComment += 0 :
            countComment += 0
            countChar += e.insert.length
        })

        let data = {
            docId: props.id,
            comment: comment,
            position: countComment
        };
        // console.log(data);
        let id = '';

        await fetch(API_URL + '/comment', {
            method: 'POST',
            headers: {
                'x-access-token': props.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data, "From /comment");
            id = data.data.id;
        })
        .catch(e => console.log(e));

		comments.splice(countComment, 0, {"_id": id, "text": comment})
        // uncomment this later
        console.log(html);
        props.onSaveText(html);
        // console.log(props.comment);
        // setComments({comment});
    }

    const removeComment = async (event) => {
        const id = event.target.id;
        const index = comments.findIndex(e => e._id === id);
        // const content = props.selection.getContents();
        const content = props.onEditor.getContents();
        console.log(id, "Id got");
        console.log(index);
        console.log(content);
        let count = 0;
        var new_content = content.map(e => {
            // console.log(e);
            if (e.hasOwnProperty('attributes')) {
                if (e.attributes.hasOwnProperty('background')) {
                    // console.log(count);
                    count++;
                    if (index === count - 1) {
                        delete e.attributes['background']
                        // console.log(Object.keys(e.attributes).length);
                        if (Object.keys(e.attributes).length === 0) {
                            delete e["attributes"];
                        }
                        // return e
                    }
                }
            }
            return e
        });
        // console.log(new_content);

        var converter = new QuillDeltaToHtmlConverter(new_content, {});

        var html = converter.convert();

        // console.log(props.comment);
        // let com;
        // // com = props.comment.filter(e => e._id != id)
        // console.log(comments);
        // com = comments.filter(e => e._id != id)
        // console.log(com);

        var data = {
            commentID: id,
            _id: props.id
        }

        // Change in database
        await fetch(API_URL + '/comment', {
            method: 'DELETE',
            headers: {
                'x-access-token': props.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data, "From delete /comment");
        })
        .catch(e => console.log(e));
        console.log(comments);
        comments.splice(index, 1)
        console.log(comments, "removed");

        props.onSaveText(html);
        // props.onText(html)
        // props.onComments(com)
    }

    // return (
    //     <div>{
    //         console.log(comments),
    //         comments.length > 0 ?
    //             <div className="comments">{
    //                 comments.map(e => <div key={e.text}>{e.text}</div>)
    //             }</div>
    //         :
    //         <div className="no-comments"></div>
    //         /* <div className="comments" onClick={setComments}>Comments</div> */
    //     }</div>
    // );
    let div = []
    div = comments.map(e => {
        return (
            <div key={e._id} id={e._id} onClick={removeComment}>{e.text}</div>
        )
    })
    // console.log(div);
    if (div.length > 0) {
        return (<div className="comments"><div>{div}</div></div>)
    }
    return (<div></div>)
}
