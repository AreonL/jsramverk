import React, { useEffect, useState } from "react";

function Document(props) {
    console.log("name", props.new_text);
    // const [name, setName] = useState('');
    // console.log(value);
    const [res, setState] = useState([]);
    const [active, setActive] = useState('');

    // fetch('https://jsramverk-editor-arba20.azurewebsites.net/document')
    const getAll = async () => {
        const response = await fetch('https://jsramverk-editor-arba20.azurewebsites.net/document')
        const data = await response.json();

        console.log("Got data", data);
        setState(data.data);
    }

    const changeActive = (event) => {
        console.log("Change Active");
        setActive(event.target.value)
    }

    const submitChange = (event) => {
        console.log("Submitting");
        event.preventDefault();
        var theOne = res.filter(e => e._id === active)[0];

        console.log(theOne, "the one");
        props.onSelect(theOne);
        // props.onSelectText(theOne.text);
        // props.onSelectId(theOne._id);
    }

    useEffect(() => {
        getAll();
    }, [])

    useEffect(() => {
        console.log("Target reached!");
        getAll();
    }, [props.new_text])

    return (
        <form onSubmit={submitChange}>
            <select name="documents" value={active} onChange={changeActive}>
                <option value="null">Documents</option>
                {/* {console.log(res)} */}
                {res.map(e => (
                    <option key={e._id} value={e._id}>{e.name}</option>
                ))}
            </select>
            <input type="submit" value="Hämta" className="saveButton" />
        </form>
    );
}

export default Document;