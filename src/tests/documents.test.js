import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";

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

test("should render editor", async () => {
    let text = "Test text";
    let new_text = "";

    const setText = jest.fn(e => {
        text = e;
    });
    const onChange = jest.fn();
    const setId = jest.fn();
    const setName = jest.fn();
    // onChange.mockImplementation(e => {
    //     console.log(e);
    //     text = e;
    // })
    // setText.mockImplementation(e => {
    //     console.log(e);
    //     text = e;
    // })

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
                <Document onText={setText} onId={setId} onName={setName} new_text={new_text}/>
                <EditorReactQuill value={text} onChange={onChange}/>
                <SaveButton />
            </div>,
            container
        )
    })

    // const buttonGetDocument = document.querySelector("[data-testid=getDoc]");
    // const selectDocument = document.querySelector("[data-testid=selectDoc]")
    // const optionTest1 = document.querySelector("[data-testid=options-1]")
    // const optionTest2 = document.querySelector("[data-testid=options-2]")

    // expect(container.querySelector("[data-testid='quill']").textContent).toEqual("Test text");

    // // Click Hämta but nothing changes
    // act(() => {
    //     buttonGetDocument.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    // })

    // // Expect default to not trigger and still have default text
    // expect(container.querySelector("[data-testid='quill']").textContent).toEqual("Test text");

    // // Change the value of the selector
    // act(() => {
    //     Simulate.change(selectDocument, { target: { value: optionTest1.value} } )
    // })

    // // Fires a button click on "Hämta"
    // act(() => {
    //     buttonGetDocument.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    // })

    // // Re-render for updated text
    // act(() => {
    //     render(
    //         <div>
    //             <Document onText={setText} onId={setId} onName={setName} new_text={new_text}/>
    //             <EditorReactQuill value={text} onChange={onChange}/>
    //         </div>,
    //         container
    //     )
    // })

    // // Check if changes in editor has been made
    // expect(container.querySelector("[data-testid='quill']").textContent).toEqual("Some Text 1");

    // act(() => {
    //     Simulate.change(selectDocument, { target: { value: optionTest2.value} } )
    // })

    // // Fires a button click on "Hämta"
    // act(() => {
    //     buttonGetDocument.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    // })

    // // Re-render for updated text
    // act(() => {
    //     render(
    //         <div>
    //             <Document onText={setText} onId={setId} onName={setName} new_text={new_text}/>
    //             <EditorReactQuill value={text} onChange={onChange}/>
    //         </div>,
    //         container
    //     )
    // })

    // // Check if changes in editor has been made
    // expect(container.querySelector("[data-testid='quill']").textContent).toEqual("Some Text 2");

    global.fetch.mockRestore();
})