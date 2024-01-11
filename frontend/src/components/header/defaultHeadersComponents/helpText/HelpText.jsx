import React from "react";
import classes from './helpText.module.css'

function HelpText({children, ...props}){
    return (
        <span className={classes.helpText}>
            {children}
        </span>
    )
}
// Впервые здесь?
export default HelpText