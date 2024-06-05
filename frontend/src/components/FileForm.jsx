import React, { useState } from 'react';

import ButtonOnClick from "./ButtonOnClick"

const FileForm = ({sendFile}) => {
    const [file, setFile] = useState(null)

    const uploadFile = (event) => {
        event.preventDefault()
        sendFile(file)
    }

    return (
        <div>
            <p>Por favor, selecciona un archivo CSV
                <input type="file" onChange={event => setFile(event.target.files[0])} />
            </p>
            <ButtonOnClick text='Enviar' onClick={uploadFile} />
        </div>
    )
}

export default FileForm