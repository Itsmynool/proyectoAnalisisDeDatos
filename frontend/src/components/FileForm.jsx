import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';

import ButtonOnClick from "./ButtonOnClick"

const FileForm = forwardRef(({sendFile, deleteData}, ref) => {
    const [file, setFile] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false);

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
        deleteData()
    }

    useImperativeHandle(ref, () => {
        return {
            removeFile,
            setIsDisabled
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
                    <ButtonOnClick text='Eliminar' onClick={removeFile} disabled={isDisabled} />
                </div>
            )}
            {isDisabled && (
                <div>
                    Cargando...
                </div>
            )}
        </div>
    )
})

export default FileForm