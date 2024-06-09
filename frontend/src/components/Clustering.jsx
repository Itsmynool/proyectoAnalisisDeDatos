import React, { useState, forwardRef, useImperativeHandle } from 'react';

import ImageSwitcher from './ImageSwitcher';
import Image from './Image';
import GraphOptions from './GraphOptions';

const Clustering = forwardRef((props, ref) => {
    const [data, setData] = useState(null)
    const [analysisCompleted, setAnalysisCompleted] = useState(false)
    const [pcaImg, setPcaImg] = useState(null)
    const [silhouetteImg, setSilhouetteImg] = useState(null)
    const [elbowImg, setElbowImg] = useState(null)
    const [optimalClusters, setOptimalClusters] = useState(null)
    const [pcaClusterImg, setPcaClusterImg] = useState(null)
    const [graphOptions, setGraphOptions] = useState(null)

    useImperativeHandle(ref, () => {
        return {
            setData,
            setAnalysisCompleted,
            setSilhouetteImg,
            setElbowImg,
            setOptimalClusters,
            setPcaImg,
            setPcaClusterImg,
            setGraphOptions
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

                Numero de clusters: {optimalClusters}

                <Image
                    imageSrc={pcaClusterImg}
                />

                <GraphOptions
                    list={graphOptions}
                    data={data}
                    clusters={optimalClusters}
                />
            </div>
        )}
      </div>
    )
})
  
  export default Clustering
  