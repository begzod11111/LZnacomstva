import React from "react";
import classes from './form.module.css'

function FormCt({hText, pText, children, ...props}) {
    return (
        <div className={classes.centerFormCt}>
            <h1>{hText}</h1>
            <p>{pText}</p>
            <form {...props}>
                {children}
            </form>
        </div>
    )
}

export default FormCt