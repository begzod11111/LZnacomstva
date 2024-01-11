import React from "react";
import classes from './avatar.module.css'


function UserAvatar(props) {
    return (
        <div className={classes.userAvatar}>
            <img src={props.src} alt=""/>
        </div>
    )
}

export default UserAvatar