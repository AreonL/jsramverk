import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { API_URL } from '../config';

import MockedEditorReactQuill from '../components/reactQuill';

import Document from "../components/documents";
import EditorReactQuill from "../components/reactQuill";
import SaveButton from "../components/button/saveButton";

jest.mock("../components/reactQuill", () => {
    return function DummyQuill(props) {
        return (
            <div data-testid="quill">
                {props.value}
            </div>
        );
    };
});

// jest.mock('EditorReactQuill');

let docs = {
    data: [
        { _id: "1", name: "Test1", text: "Some Text 1"},
        { _id: "2", name: "Test2", text: "Some Text 2"}
    ]
}

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test("should render save", async () => {
    // Användar _id, namn, text skriven
    let id = "1";
    let name = "Test1";
    let text = "Test text";

    // Sets docs data text too how api would update
    const setNewText = jest.fn(e => docs.data[0].text = e);

    // Data sending too api
    const data = { _id: id, text: text };

    // Fake fetch with fake doc data
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(docs)
        })
    );

    // Render components
    await act(async () => {
        render(
            <div>
                <SaveButton saveText={""} onSaveAs={setNewText} value={text} id={id} name={name}/>
            </div>,
            container
        )
    })

    const buttonSaveDocument = document.querySelector("[data-testid=saveTest]");

    // Click Save
    await act(async () => {
        await buttonSaveDocument.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
        API_URL+'/update', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        }
    );

    // Check if changes in editor has been made
    expect(docs.data[0].text).toEqual("Test text");

    global.fetch.mockRestore();
});