import React, { useState, useEffect } from 'react';

import Image from './Image';

import fileService from '../services/file'

const GraphOptions = ({list, data, clusters}) => {
  const options = list
  const [optionX, setOptionX] = useState(options[0])
  const [optionY, setOptionY] = useState(options[1])
  const [graph, setGraph] = useState(null)

  useEffect(() => {
    getGraph(data, optionX, optionY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionX, optionY]);

  const getGraph = async (data, optionX, optionY) => {
    try{
        const response = await fileService.generateGraph(data, optionX, optionY)
        setGraph(response.graph_img)
    } catch (exception) {
        console.log(exception);
    }
  }

  return (
    <div>
      <h1>Visualización de Datos</h1>
      <div>
        <label>Variable X:</label>
        <select value={optionX} onChange={(e) => {setOptionX(e.target.value)}}>
          {options.map((variable) => (
            <option key={variable} value={variable} disabled={variable === optionY} >{variable}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Variable Y:</label>
        <select value={optionY} onChange={(e) => setOptionY(e.target.value)}>
          {options
            .map((variable) => (
              <option key={variable} value={variable} disabled={variable === optionX} >{variable}</option>
            ))}
        </select>
      </div>
      <Image
        imageSrc={graph}
      />
    </div>
  );
}
  
  export default GraphOptions;