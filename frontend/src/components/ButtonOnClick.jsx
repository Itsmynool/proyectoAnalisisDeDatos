const ButtonOnClick = ({text, onClick, disabled}) => {
    return (
        <button onClick={onClick} disabled={disabled} >
            {text}
        </button>
    )
}

export default ButtonOnClick