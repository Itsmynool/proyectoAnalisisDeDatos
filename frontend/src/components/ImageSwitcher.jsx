import React, { useState } from 'react';
import Image from './Image';

const ImageSwitcher = ({ image1, image2 }) => {
  const [selectedImage, setSelectedImage] = useState('image1');

  const handleSelectImage = (event) => {
    setSelectedImage(event.target.value);
  };

  return (
    <div>
      <label>
            <input
            type="radio"
            name="selectedImage"
            value="image1"
            checked={selectedImage === 'image1'}
            onChange={handleSelectImage}
            />
            Metodo silueta
        </label>
        <label>
            <input
            type="radio"
            name="selectedImage"
            value="image2"
            checked={selectedImage === 'image2'}
            onChange={handleSelectImage}
            />
            Metodo del codo
        </label>
      {selectedImage === 'image1' ? (
        <Image imageSrc={image1} />
      ) : (
        <Image imageSrc={image2} />
      )}
    </div>
  )
}

export default ImageSwitcher;
