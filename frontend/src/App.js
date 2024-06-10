import './App.css';
import React, { useState, useRef } from 'react';

import FileForm from './components/FileForm';
import Notification from './components/Notification'
import Toggable from './components/Toggable';
import Requeriments from './components/Requeriments';
import Clustering from './components/Clustering';

import fileService from './services/file'

function App() {

  const [information, setInformation] = useState({success: null, error: null})

  const fileFormRef = useRef()
  const clusteringRef = useRef()

  const showMessage = (success, error) => {
    setInformation({success: success, error: error})
    setTimeout(() => {
      setInformation({success: null, error:null})
    }, 2000)
  }

  const saveData = (response) => {
    clusteringRef.current.setData(response.data)
    clusteringRef.current.setPcaImg(response.pcaImg)
    clusteringRef.current.setSilhouetteImg(response.silhouetteImg)
    clusteringRef.current.setElbowImg(response.elbowImg)
    clusteringRef.current.setOptimalClusters(response.optimalClusters)
    clusteringRef.current.setPcaClusterImg(response.pcaClusterImg)
    clusteringRef.current.setGraphOptions(response.columns)
    clusteringRef.current.setTableGuide(response.columsList)
    clusteringRef.current.setScore(response.score)

    clusteringRef.current.setAnalysisCompleted(true)
  }

  const sendFile = async (file) => {
    try{
      fileFormRef.current.setIsDisabled(true)
      const formData = new FormData();
      formData.append('file', file);
      const response = await fileService.sendFile(formData)
      console.log(response);
      saveData(response)
    } catch (exception) {
      showMessage(null, exception.response.data.error)
      console.log(exception.response);
      fileFormRef.current.removeFile()
    } finally {
      fileFormRef.current.setIsDisabled(false)
    }
  }

  const deleteData = () => {
    clusteringRef.current.deleteData()
  }

  return (
    <div className='App'>
      <h1 className='pricipal-title' >Clustering Tarjetas de credito</h1>
      <Notification message={information.error} type='Error' />
      <Notification message={information.success} type='Success' />

      <div>
        <p>Requerimientos del dataset</p>
        <Toggable buttonLabel='Ver'>
          <Requeriments/>
        </Toggable>
      </div>

      <FileForm sendFile={sendFile} deleteData={deleteData} ref={fileFormRef} />

      <Clustering
        ref={clusteringRef}
      />

    </div>
  );
}

export default App;
