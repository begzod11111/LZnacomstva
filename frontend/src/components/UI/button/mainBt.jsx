import React from "react";
import classes from './myButton.module.css'

function MainBt({children, ...props}) {
    return (
        <button {...props} className={classes.mainBt}>
            {children}
        </button>
    );
}

export default MainBt