import React, { useState, useEffect } from 'react';
import Image from './Image';

import fileService from '../services/file';
import styles from '../styles/GraphOptions.module.css';

const GraphOptions = ({ list, data }) => {
  const options = list;
  const [optionX, setOptionX] = useState(options[0]);
  const [optionY, setOptionY] = useState(options[1]);
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    getGraph(data, optionX, optionY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionX, optionY]);

  const getGraph = async (data, optionX, optionY) => {
    try {
      const response = await fileService.generateGraph(data, optionX, optionY);
      setGraph(response.graph_img);
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Visualización de Datos</h1>
      <div className={styles.selectContainer}>
        <label>Variable X: </label>
        <select value={optionX} onChange={(e) => setOptionX(e.target.value)}>
          {options.map((variable) => (
            <option key={variable} value={variable} disabled={variable === optionY}>
              {variable}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.selectContainer}>
        <label>Variable Y: </label>
        <select value={optionY} onChange={(e) => setOptionY(e.target.value)}>
          {options.map((variable) => (
            <option key={variable} value={variable} disabled={variable === optionX}>
              {variable}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.imageContainer}>
        <Image imageSrc={graph} />
      </div>
    </div>
  );
};

export default GraphOptions;
