import classes from "./personProfile.module.css"
import LinkBt from "../../../UI/button/linkBt";
import React from "react";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";

function PersonProfileCt({children, ...props}) {
    return (
        <div className={classes.personProfile}>
            <LinkBt href="" className={classes.rightLink}>
                <MdKeyboardArrowRight className={classes.icon}/>
            </LinkBt>
            <LinkBt className={classes.leftLink} href="">
                <MdKeyboardArrowLeft className={classes.icon}/>
            </LinkBt>
            {children}
        </div>
    )
}

export default PersonProfileCt