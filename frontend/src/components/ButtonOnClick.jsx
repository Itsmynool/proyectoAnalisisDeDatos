const ButtonOnClick = ({text, onClick}) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

export default ButtonOnClick