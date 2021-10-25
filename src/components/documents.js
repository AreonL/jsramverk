import React, { useEffect, useState } from "react";
import { GRAPH_URL } from "../config";
import CreatePDF from './button/createPDF'

// const API_URL = 'http://localhost:4000/document';

function Document(props) {
    // const [name, setName] = useState('');
    const [res, setState] = useState([]);
    const [active, setActive] = useState('');
    const [name, setName] = useState('');

    // fetch('https://jsramverk-editor-arba20.azurewebsites.net/document')
    // const getAll = async () => {
    //     const response = await fetch('https://jsramverk-editor-arba20.azurewebsites.net/document')
    //     const data = await response.json();

    //     // console.log("Got data", data);
    //     setState(data.data);
    // }


    const changeActive = (event) => {
        const id = event.target.value;

        setActive(id);
        if (id != null) {
            const theOne = res.find(e => e._id === id);

            setName(theOne.name);
        }
    }

    const submitChange = (event) => {
        event.preventDefault();
        if (active === "null" || active === '') {
            return
        }
        //console.log(res);
        var theOne = res.filter(e => e._id === active)[0];

        // console.log("The ONE", theOne.comments);
        props.onId(theOne._id);
        props.onText(theOne.text);
        props.onName(theOne.name);
        props.onComments(theOne.comments);
        // props.onSelect(theOne);
    }

    useEffect(() => {
        //console.log(props.token, props.email, "FETCHING HERE");
        fetch(GRAPH_URL, {
            method: 'POST',
            headers: {
                'x-access-token': props.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: '{ docs (email: "' + props.email + '") { name text _id comments { _id text } } }' })
        })
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            data = data.data.docs;
            // let comments = data[0].comments;

            if (data != null) {
                // if (data[0].comments != null) {
                //     if (data[0].comments.length === 1) {
                //         props.onComments(data[0].comments)
                //     }
                // }
                // console.log(data);
                setState(data);
                // var win = window.open("https://google.com", '_blank');
                // win.focus();
            }
        });
    }, [props.new_text, props.token, props.email])

    // if (!res) {
    //     return "laddar.....";
    // }


    return (
        <div>
            <select name="documents" value={active} onChange={changeActive} data-testid="selectDoc">
                <option value="null">Documents</option>
                {/* { console.log(res) } */}
                {res.length > 0 ? res.map(e => (
                    <option data-testid={`options-${e._id}`} key={e._id} value={e._id}>{e.name}</option>
                )) : <option value="null">Loading..</option>}
            </select>
            <button data-testid="getDoc" className="saveButton" onClick={submitChange}>Hämta
            </button>
            <CreatePDF token={props.token} name={name} text={props.PDFText}/>
        </div>
    );
}

export default Document;