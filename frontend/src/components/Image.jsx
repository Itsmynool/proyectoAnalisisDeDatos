const Image = ({ imageSrc }) => {
    if (!imageSrc) return null;
  
    return (
      <div>
        <img src={`data:image/png;base64,${imageSrc}`} alt="Generated Chart" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    );
  };
  
  export default Image;