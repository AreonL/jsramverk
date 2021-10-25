import React, { useEffect, useState } from "react";
import { CODE_URL } from "../../config";
import GetCode from "./button/getCode";
import ExecuteCode from "./button/sendCode";

export default function Codes(props) {
    const [codeData, setCodeData] = useState([]);
    const [active, setActive] = useState('');
    const [name, setName] = useState('');

    const changeActive = (event) => {
        event.preventDefault();
        const id = event.target.value;
        if (id === "null" || id === '') {
            return
        }

        const theOne = codeData.find(e => e._id === id);
        setActive(id);
        setName(theOne.name);
    }

    const submitChange = (event) => {
        event.preventDefault();
        if (active === "null" || active === '') {
            return
        }
        console.log(codeData);
        var theOne = codeData.filter(e => e._id === active)[0];
        console.log(theOne);

        props.setId(theOne._id);
        props.setCode(theOne.code);
        // props.onName(theOne.name);
        // // props.onSelect(theOne);
    }

    useEffect(() => {
        // console.log(props.token, props.email, "FETCHING HERE");
        fetch(CODE_URL, {
            method: 'GET',
            headers: {
                'x-access-token': props.token,
            },
        })
        .then(res => res.json())
        .then(data => {
            setCodeData(data.data);
        });
    }, [props.token, props.newCode])

    // if (!res) {
    //     return "laddar.....";
    // }


    return (
        <div>
            <select name="codes" value={active} onChange={changeActive} data-testid="selectCode">
                <option value="null">Codes</option>
                {/* { console.log(res) } */}
                {codeData.length > 0 ? codeData.map(e => (
                    <option data-testid={`options-${e._id}`} key={e._id} value={e._id}>{e.name}</option>
                )) : <option value="null">Create code!</option>}
            </select>
            <GetCode
                token={props.token} onClick={submitChange}
            />
            <ExecuteCode code={props.code}/>
        </div>
    );
};