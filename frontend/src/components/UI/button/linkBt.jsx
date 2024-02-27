import React from "react";
import classes from './myButton.module.css'
import classNames from 'classnames'


function LinkBt({children, className, ...props}) {
    let btClass;
    if (className){
        btClass = classNames(className, classes.linkBt)
    } else {
        btClass = classNames(classes.linkBt)
    }
    return (
        <a className={btClass} {...props}>
            {children}
        </a>
    );
}

export default LinkBt