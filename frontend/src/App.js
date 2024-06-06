import './App.css';
import React, { useState, useRef } from 'react';

import FileForm from './components/FileForm';
import Notification from './components/Notification'
import Toggable from './components/Toggable';
import Requeriments from './components/Requeriments';
import Table from './components/Table';

import fileService from './services/file'

function App() {
  const [dfHead, setDfHead] = useState(null)

  const [information, setInformation] = useState({success: null, error: null})

  const fileFormRef = useRef()

  const showMessage = (success, error) => {
    setInformation({success: success, error: error})
    setTimeout(() => {
      setInformation({success: null, error:null})
    }, 2000)
  }

  const sendFile = async (file) => {
    try{
      const formData = new FormData();
      formData.append('file', file);
      const response = await fileService.sendFile(formData)
      setDfHead(response.df_head)
      console.log('RESPONSE: ', response);
    } catch (exception) {
      showMessage(null, exception.response.data.error)
      console.log(exception.response);
      fileFormRef.current.removeFile()
    }
  }

  return (
    <div>
      <h1>Clustering Tarjetas de credito</h1>
      <Notification message={information.error} type='Error' />
      <Notification message={information.success} type='Success' />

      <div>
        <p>Requerimientos del dataset</p>
        <Toggable buttonLabel='Ver'>
          <Requeriments/>
        </Toggable>
      </div>

      <FileForm sendFile={sendFile} ref={fileFormRef} />

      {dfHead != null && (
        <div>
          <h2>CSV cargados (5 primeros)</h2>
          <Table
            data={dfHead}
          />
        </div>
      )}

    </div>
  );
}

export default App;
