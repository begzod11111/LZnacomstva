import React from 'react'
import classes from './mainInput.module.css'

function MainInput(props) {
    return (
        <label className={classes.mainInputLabel}>
            <i>{props.icon}</i>
            <input {...props}/>
        </label>
    )
}

export default MainInput;