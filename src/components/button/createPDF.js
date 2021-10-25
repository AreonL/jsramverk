import React from "react";
import { API_URL } from '../../config'
import { saveAs } from 'file-saver'

function CreatePDF(props) {
	const onCreatePDF = async () => {
		console.log("Creating PDF", props.text);
		const data = {
			text: props.text
		}
		// .then(res => console.log(res))
		fetch(API_URL + '/pdf', {
			method: 'POST',
			headers: {
				'x-access-token': props.token,
				'Content-Type': 'application/json',
                'Accept': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(response => response.blob())
			.then(function(pdfBlob) {
				const PDFBlob = new Blob([pdfBlob], { type: 'application/pdf' });

				saveAs(PDFBlob, props.name + '.pdf')
			})
			.catch(error => console.log('Error:', error));
		// console.log("calling pdf2");
		// fetch(API_URL + '/pdf2')
	}

    return (
		<button className="saveButton" onClick={onCreatePDF}>Download PDF</button>
    );
}

export default CreatePDF;