import React from 'react'
import classes from './mainInput.module.css'

function MainInput({defaultValue, icon, placeholder, ...props}) {
    return (
        <label className={classes.mainInputLabel}>
            <i>{icon}</i>
            {
                defaultValue  ?
                <input {...props} defaultValue={defaultValue}/>
                :
                <input {...props} placeholder={placeholder ? placeholder : 'Не указанно'}/>
            }
        </label>
    )
}

export default MainInput;