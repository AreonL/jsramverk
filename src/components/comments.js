// import { response } from "express";
import React, { useState } from "react";
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import Delta from "quill-delta";
import Quill from "quill";
import { API_URL } from '../config';

export default function Comments(props) {
    const [count, setCount] = useState(0)

    const addComment = async () => {
        // const range = props.selection.range;
        const editor = props.selection;
        const range = editor.getSelection();
        //console.log(editor.getContents(), editor.getSelection());
        let deltaString = editor.getContents();
        let new_count = count + 1
        let comment = `Added comment nr: ${new_count}`

        if (!range) {
            return false
        }
        if (range.length === 0) {
            return false
        }

        //console.log(props.token);

        // await fetch(API_URL + '/comment', {
        //     method: 'POST',
        //     headers: {
        //         'x-access-token': props.token,
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data, "From /comment");
        // })
        // .catch(e => console.log(e));
        // console.log(deltaString);

        //const dom = document.getElementsByClassName('ql-editor');
        //console.log(dom);

        const death = new Delta().retain(range.index).retain(range.length, { background: 'cyan' })
                        //  .insert(lista, { background: 'cyan' })
                        //  .delete(range.length);

        const restored = deltaString.compose(death);

        var cfg = {};

        var converter = new QuillDeltaToHtmlConverter(restored.ops, cfg);

        var html = converter.convert();

        // console.log(restored);
        // console.log(range.index, range.length, "range");
        // props.setComments(comment);



        // var selection = editor.getSelection();
        // var selectedContent = editor.getContents(selection.index, selection.length);
        // var tempContainer = document.createElement('div')
        // var tempQuill = new Quill(tempContainer);
        // tempQuill.setContents(selectedContent);
        // console.log(tempContainer.querySelector('.ql-editor').innerHTML);

        console.log("RangeI:", range.index, "RangeL:", range.length);
        // console.log(converter);
        console.log(deltaString);
        var countChar = 0;
        var countComment = 0;
        converter.rawDeltaOps.map(e => {
            if (countChar >= range.index) {
                return
            }
            // if (e.attributes) {
            //     if (e.attributes.includes('background')) {
            //         countChar += e.insert.length
            //     }
            // }
            e.hasOwnProperty('attributes') ?
            e.attributes.hasOwnProperty('background') ?
            countComment += 1 :
            countComment += 0 :
            countComment += 0
            countChar += e.insert.length
        })
        console.log(countComment, countChar);
        // attributes: {background: 'cyan'}
        // insert: "Add some boiler text"

        let data = {
            docId: props.id,
            comment: comment,
            position: countComment
        };

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
        })
        .catch(e => console.log(e));

        setCount(new_count);
        props.setText(html, comment, countComment);







        // const getSpan = new Delta().retain(range.index)
        // console.log(converter);
        // const ngetSpan = deltaString.compose(getSpan)
        // var nconverter = new QuillDeltaToHtmlConverter(ngetSpan.ops, cfg);
        // console.log(nconverter);
        // var nhtml = nconverter.convert();
        // console.log(nhtml);
        // html = html.split('<')

        // html.filter(e => {
            //     if (e.includes('span') && !e.includes('/span') && !e.includes('data')) {
                //         console.log(e);
        //         console.log("Here");
        //         e = e.split(' ');
        //         let added = e[0] + ' data-index=0 ' + e[1];
        //         return added
        //     }
        // });
        // console.log(html.join('<'));



        // const conv = new QuillDeltaToHtmlConverter(deltaString.ops);
        // console.log(conv);

        // const delta2 = new Delta([
        //     { insert: 'Gandalf', attributes: { bold: true } },
        //     { insert: '\nthe\n' },
        //     { insert: 'Grey', attributes: { color: '#ccc' } }
        // ]);
        // var count2 = 0;
        // var count3 = 0;
        // var lista = [];
        // deltaString.ops.map(e => {
        //     var new_e = e.insert.split('');
        //     new_e.forEach(c => {
        //         if (count2 > range.index - 1 && count3 < range.length) {
        //             count3++;
        //             lista.push(c);
        //         }
        //         count2++;
        //     });
        // });
        // lista = lista.join('');

        // console.log(lista);



        // let pure = delta.ops.map(e => e.insert).join('');
        // console.log(pure, pure.length, "length");

        // TODO: DELTA? can be useful
        // delta -> html -> editorquill


        // var deltaOps =  [
        //     {insert: "1\n"},
        //     {insert: "2", attributes: {bold: true}},
        //     {insert: "\n3", attributes: {background: 'lightblue'}}
        //     // {insert: "1\n"},
        //     // {insert: "2", attributes: {bold: true}},
        //     // {insert: "\n3\n"}
        // ];

        // console.log(deltaString.ops);

        // // var deltaO = delta.ops
        // var deltaO = deltaOps

        // console.log(deltaO, deltaOps);

        // var cfg = {};

        // var converter = new QuillDeltaToHtmlConverter(restored.ops, cfg);

        // var html = converter.convert();


        // console.log(editor.getText());
        // console.log(range);

    }

    return (
        <button className="saveButton" onClick={props.addComment}>Comment</button>
    );
}

