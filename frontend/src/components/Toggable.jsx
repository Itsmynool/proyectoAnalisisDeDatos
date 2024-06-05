import { useState, forwardRef, useImperativeHandle } from "react";
import ButtonOnClick from "./ButtonOnClick";

const Toggable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <ButtonOnClick onClick={toggleVisibility} text={props.buttonLabel} />
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <ButtonOnClick onClick={toggleVisibility} text='cerrar' />
            </div>
        </div>
    )
})

export default Toggable