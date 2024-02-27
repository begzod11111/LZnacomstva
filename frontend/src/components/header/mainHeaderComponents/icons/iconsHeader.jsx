import React from "react";
import classes from './icons.module.css'
import {IoMdNotifications, IoMdSearch} from "react-icons/io";


function IconsHeader(props) {
    return (
        <div className={classes.iconsHeader}>
            {props.messages ? <span>{props.messages}</span> : ""}
            <button type="button"><IoMdSearch /></button>
            <button type="button"><IoMdNotifications /></button>
        </div>
    )

}

export default IconsHeader