import React, { useEffect, useState } from "react";

function moduleDocument() {
    console.log(value);
    // var res = {};
    // var data = {};
    const [res, setState] = useState();
    // var reactData = {}

    // useEffect(() => {
        // console.log(res);
    // })
    // fetch('https://jsramverk-editor-arba20.azurewebsites.net/document')
    const getAll = async () => {
        const response = await fetch('http://localhost:4000/document')
        const data = await response.json();
        setState(data);
        // console.log(data.data);
        // res = data.data;
    }

    useEffect(() => {
        if (!res) {
            getAll();
        }
    })
    return (res)
}