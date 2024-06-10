import styles from '../styles/ButtonOnClick.module.css';

const ButtonOnClick = ({ text, onClick, disabled }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default ButtonOnClick;
