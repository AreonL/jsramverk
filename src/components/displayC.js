import Delta from "quill-delta";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import React, { useState, useEffect } from "react";
import { API_URL } from "../config";

export default function DisplayComments(props) {
    const [comments, setComments] = useState([]);

    const renewComments = (arg) => {
        setComments(arg);
    }

    useEffect(() => {
        if (!props.comment) {
            return false;
        }
        renewComments(props.comment)
    }, [props.comment])

    useEffect(() => {
        // console.log(props.addComment);
        if (props.addComment.length !== 0) {
            addComment()
        }
    }, [props.addComment]) // eslint-disable-line react-hooks/exhaustive-deps
    // This line is quite bad.. , either do this ^ or move the whole function inside the useEffect

    const addComment = async () => {
        const editor = props.onEditor;
        const range = props.onRange;
        let deltaString = editor.getContents();
        let comment = prompt("Add comment:")
        if (Object.keys(range).length === 0) {
            return false
        }
        if (range.length === 0 || !comment) {
            return false
        }
        // Keep everything untill start of selected, + length and add background to length
        const death = new Delta().retain(range.index).retain(range.length, { background: 'cyan' })
        const restored = deltaString.compose(death);
        var converter = new QuillDeltaToHtmlConverter(restored.ops, {});
        var html = converter.convert();

        var countChar = 0;
        var countComment = 0;
        var canAdd = true;
        converter.rawDeltaOps.forEach(e => {
            if (countChar >= range.index) {
                return null
            }
            // if attributes, if background +1, else 0
            if (e.hasOwnProperty('attributes')) {
                if (e.attributes.hasOwnProperty('background') && canAdd) {
                    countComment += 1
                    canAdd = false
                } else {
                    canAdd = true;
                }
            } else {
                canAdd = true;
            }
            countChar += e.insert.length
        })

        let data = {
            docId: props.id,
            comment: comment,
            position: countComment
        };
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

        props.onSaveText(html);
    }

    const removeComment = async (event) => {
        const id = event.target.id;
        const index = comments.findIndex(e => e._id === id);
        const content = props.onEditor.getContents();
        // Get id, index of comment and content from editor
        let count = 0;
        var hasRemoved = false;
        // Delete background attribute from _id comment
        var new_content = content.map(e => {
            if (e.hasOwnProperty('attributes')) {
                if (e.attributes.hasOwnProperty('background')) {
                    if (index === count) {
                        delete e.attributes['background']
                        if (Object.keys(e.attributes).length === 0) {
                            delete e["attributes"];
                        }
                        hasRemoved = true;
                        // return e
                    } else {
                        count++;
                    }
                } else if (hasRemoved) {
                    count++;
                }
            } else if (hasRemoved) {
                count++;
            }
            return e
        });
        // Convert back to html without the removed attribute
        var converter = new QuillDeltaToHtmlConverter(new_content, {});
        var html = converter.convert();

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
        // Remove from comment list
        comments.splice(index, 1);

        props.onSaveText(html);
    }

    let div = []
    div = comments.map(e => {
        return (
            <div key={e._id} id={e._id} onClick={removeComment}>{e.text}</div>
        )
    })
    if (div.length > 0) {
        return (<div className="comments"><div>{div}</div></div>)
    }
    return (<div></div>)
}
