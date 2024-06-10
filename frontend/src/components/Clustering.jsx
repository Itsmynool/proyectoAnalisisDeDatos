import React, { useState, forwardRef, useImperativeHandle } from 'react';

import ImageSwitcher from './ImageSwitcher';
import Image from './Image';
import GraphOptions from './GraphOptions';
import Table from './Table'


const Clustering = forwardRef((props, ref) => {
    const [data, setData] = useState(null)
    const [analysisCompleted, setAnalysisCompleted] = useState(false)
    const [pcaImg, setPcaImg] = useState(null)
    const [silhouetteImg, setSilhouetteImg] = useState(null)
    const [elbowImg, setElbowImg] = useState(null)
    const [optimalClusters, setOptimalClusters] = useState(null)
    const [pcaClusterImg, setPcaClusterImg] = useState(null)
    const [graphOptions, setGraphOptions] = useState(null)
    const [tableGuide, setTableGuide] = useState(null)
    const [score, setScore] = useState(null)

    const deleteData = () => {
        setData(null)
        setAnalysisCompleted(null)
        setPcaImg(null)
        setSilhouetteImg(null)
        setElbowImg(null)
        setOptimalClusters(null)
        setPcaClusterImg(null)
        setGraphOptions(null)
        setTableGuide(null)
        setScore(null)
    }

    useImperativeHandle(ref, () => {
        return {
            setData,
            setAnalysisCompleted,
            setSilhouetteImg,
            setElbowImg,
            setOptimalClusters,
            setPcaImg,
            setPcaClusterImg,
            setGraphOptions,
            deleteData,
            setTableGuide,
            setScore
        }
    })

    return (
      <div>
        {analysisCompleted && (
            <div>
                <Image
                    imageSrc={pcaImg}
                />

                <ImageSwitcher
                    image1={silhouetteImg}
                    image2={elbowImg}
                />

                <div>
                    <p><b>Numero de clusters: </b>{optimalClusters}</p>
                </div>
                <div>
                    <p><b>Score: </b>{score}</p>
                </div>

                <Image
                    imageSrc={pcaClusterImg}
                />

                <GraphOptions
                    list={graphOptions}
                    data={data}
                    clusters={optimalClusters}
                />

                <Table
                    data={data}
                    numberOfClusters={optimalClusters}
                    tableGuide={tableGuide}
                />
            </div>
        )}
      </div>
    )
})
  
  export default Clustering
  