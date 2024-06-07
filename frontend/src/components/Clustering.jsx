import React, { useState, forwardRef, useImperativeHandle } from 'react';

import Table from '../components/Table'
import ImageSwitcher from './ImageSwitcher';
import Image from './Image';

const Clustering = forwardRef((props, ref) => {
    const [data, setData] = useState(null)
    const [analysisCompleted, setAnalysisCompleted] = useState(false)
    const [pcaImg, setPcaImg] = useState(null)
    const [silhouetteImg, setSilhouetteImg] = useState(null)
    const [elbowImg, setElbowImg] = useState(null)
    const [optimalClusters, setOptimalClusters] = useState(null)
    const [pcaClusterImg, setPcaClusterImg] = useState(null)

    useImperativeHandle(ref, () => {
        return {
            setData,
            setAnalysisCompleted,
            setSilhouetteImg,
            setElbowImg,
            setOptimalClusters,
            setPcaImg,
            setPcaClusterImg
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
            </div>
        )}
      </div>
    )
})
  
  export default Clustering
  