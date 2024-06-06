import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';

import ButtonOnClick from "./ButtonOnClick"

const FileForm = forwardRef(({sendFile}, ref) => {
    const [file, setFile] = useState(null)

    const fileInputRef = useRef(null);

    const fileOnChange = (event) => {
        setFile(event.target.files[0])
        sendFile(event.target.files[0])
    }

    const removeFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setFile(null);
    }

    useImperativeHandle(ref, () => {
        return {
            removeFile
        }
    })

    return (
        <div>
            {!file && (
                <div>
                    <p>Por favor, selecciona un archivo CSV</p> 
                    <div><input type="file" ref={fileInputRef} onChange={fileOnChange} /></div>
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
})

export default FileForm