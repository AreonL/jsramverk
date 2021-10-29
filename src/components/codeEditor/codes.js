import React, { useEffect, useState } from "react";
import { CODE_URL } from "../../config";
import GetCode from "./button/getCode";
import ExecuteCode from "./button/sendCode";

export default function Codes(props) {
    const [codeData, setCodeData] = useState([]);
    const [active, setActive] = useState('');

    const changeActive = (event) => {
        event.preventDefault();
        const id = event.target.value;
        if (id === "null" || id === '') {
            return
        }

        setActive(id);
    }

    const submitChange = (event) => {
        event.preventDefault();
        if (active === "null" || active === '') {
            return
        }

        var theOne = codeData.filter(e => e._id === active)[0];

        props.setId(theOne._id);
        props.setCode(theOne.code);
    }

    useEffect(() => {
        if (!props.token || !props.newCode) {
            return false
        }
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

    return (
        <div>
            <select name="codes" value={active} onChange={changeActive} data-testid="selectCode">
                <option value="null">Codes</option>
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