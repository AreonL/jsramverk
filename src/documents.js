import React, { useEffect, useState } from "react";
// import { useAsync } from "react-use";

// const API_URL = 'https://jsramverk-editor-arba20.azurewebsites.net/document';
const API_URL = 'http://localhost:4000/document';

function Document(props) {
    // console.log("name", props.new_text);
    // const [name, setName] = useState('');
    // console.log(value);
    const [res, setState] = useState([]);
    const [active, setActive] = useState('');

    // fetch('https://jsramverk-editor-arba20.azurewebsites.net/document')

    // const yes = useAsync();

    // const getAll = async () => {
    //     const response = await fetch('https://jsramverk-editor-arba20.azurewebsites.net/document')
    //     const data = await response.json();

    //     // console.log("Got data", data);
    //     setState(data.data);
    // }


    const changeActive = (event) => {
        // console.log("Change Active");
        // console.log(event.target.value);
        setActive(event.target.value)
    }

    const submitChange = (event) => {
        event.preventDefault();
        if (active === "null" || active === '') {
            return
        }
        console.log(res);
        var theOne = res.filter(e => e._id === active)[0];

        console.log("hämtat");
        props.onId(theOne._id);
        props.onText(theOne.text);
        props.onName(theOne.name);
        // props.onSelect(theOne);
    }

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                // console.log(data.data);
                setState(data.data);
            });
    }, [props.new_text])

    // if (!res) {
    //     return "laddar.....";
    // }


    return (
        <div>
            <select name="documents" value={active} onChange={changeActive} data-testid="selectDoc">
                <option value="null">Documents</option>
                {/* { console.log(res.length) } */}
                {res.length > 0 ? res.map(e => (
                    <option data-testid={`options-${e._id}`} key={e._id} value={e._id}>{e.name}</option>
                )) : <option value="null">Loading..</option>}
            </select>
            <button data-testid="getDoc" className="saveButton" onClick={submitChange}>Hämta
            </button>
        </div>
    );
}

export default Document;