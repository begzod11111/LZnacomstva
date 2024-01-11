import React from "react";
import classes from './avatarCt.module.css'


function UserAvaCt({children, ...props}) {
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a className={classes.userAvaCt}>
            {children}
            <span>{props.fullName}</span>
        </a>
    )
}

export default UserAvaCt