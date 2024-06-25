import React from 'react'
import classes from './mainInput.module.css'

const MainInput = React.forwardRef(({defaultValue, icon, placeholder, ...props}, ref) => {
    return (
        <label
            ref={ref}
            className={classes.mainInputLabel}>
            <i>{icon}</i>
            {
                defaultValue  ?
                <input {...props} defaultValue={defaultValue}/>
                :
                <input {...props} placeholder={placeholder ? placeholder : 'Не указанно'}/>
            }
        </label>
    )
})

export default MainInput;