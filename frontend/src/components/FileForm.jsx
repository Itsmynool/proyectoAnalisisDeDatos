import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';

import ButtonOnClick from "./ButtonOnClick"
import Loading from "./Loading"

import styles from "../styles/FileInput.module.css"

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
                <div className={styles.container}>
                    <p className={styles.label}>Por favor, selecciona un archivo CSV</p>
                    <div className={styles.inputContainer}>
                    <input type="file" ref={fileInputRef} onChange={fileOnChange} />
                    </div>
                </div>
            )}
            {file && (
                <div>
                    <p> <b>Archivo: </b> {file.name} </p>
                    <ButtonOnClick text='Eliminar' onClick={removeFile} disabled={isDisabled} />
                </div>
            )}
            {isDisabled && (
                <Loading/>
            )}
        </div>
    )
})

export default FileForm