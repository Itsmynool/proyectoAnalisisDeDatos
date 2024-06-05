import React, { useState, useRef } from 'react';

import ButtonOnClick from "./ButtonOnClick"

const FileForm = ({sendFile}) => {
    const [file, setFile] = useState(null)

    const fileInputRef = useRef(null);


    const uploadFile = (event) => {
        event.preventDefault()
        sendFile(file)
    }

    const removeFile = () => {
        //console.log("FILE: ", file.name);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setFile(null);
    }

    return (
        <div>
            {!file && (
                <div>
                    <p>Por favor, selecciona un archivo CSV</p> 
                    <div><input type="file" ref={fileInputRef} onChange={event => setFile(event.target.files[0])} /></div>
                    <ButtonOnClick text='Enviar' onClick={uploadFile} />
                </div>
            )}
            {file && (
                <div>
                    <p> {file.name} </p>
                    <ButtonOnClick text='Eliminar' onClick={removeFile} />
                </div>
            )}
        </div>
    )
}

export default FileForm