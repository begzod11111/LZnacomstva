import React from "react";
import classes from './form.module.css'

function FormCt({children, ...props}) {
    return (
        <div className={classes.centerFormCt}>
            <h1>{props['hText']}</h1>
            <p>{props['pText']}</p>
            <form {...props}>
                {children}
            </form>
        </div>
    )
}

export default FormCt