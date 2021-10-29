import React, { useEffect, useState } from "react";
import { GRAPH_URL } from "../config";
import CreatePDF from './button/createPDF'

function Document(props) {
    const [res, setState] = useState([]);
    const [active, setActive] = useState('');
    const [name, setName] = useState('');

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
        var theOne = res.filter(e => e._id === active)[0];

        props.onId(theOne._id);
        props.onText(theOne.text);
        props.onName(theOne.name);
        props.onComments(theOne.comments);
        // props.onSelect(theOne);
    }

    useEffect(() => {
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
            data = data.data.docs;

            if (data != null) {
                setState(data);
            }
        });
    }, [props.new_text, props.token, props.email])

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