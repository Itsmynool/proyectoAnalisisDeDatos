import styles from '../styles/Image.module.css';

const Image = ({ imageSrc }) => {
  return (
    <div className={styles['image-container']}>
      <img src={`data:image/png;base64,${imageSrc}`} alt="Generated Chart" className={styles.image} />
    </div>
  );
};

export default Image;
