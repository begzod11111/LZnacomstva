import React from "react";
import classes from './myButton.module.css'

function LinkBt({children, ...props}) {
    return (
        <a className={classes.linkBt} {...props}>
            {children}
        </a>
    );
}

export default LinkBt