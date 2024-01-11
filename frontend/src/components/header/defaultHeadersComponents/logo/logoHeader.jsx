import React from "react";
import logo from "./logo.svg";
import classes from './logo.module.css'

function LogoHeader(props) {
    return (
        <a href='' className={classes.logo}>
            <img alt='logo' src={logo}/>
        </a>
    )
}

export default LogoHeader