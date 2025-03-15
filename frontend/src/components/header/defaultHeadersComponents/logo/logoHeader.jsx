import React from "react";
import logo from "./logo.svg";
import classes from './logo.module.css'
import {Link} from "react-router-dom";

function LogoHeader(props) {
    return (
        <Link to='/goal-meeting/' href='' className={classes.logo}>
            <img alt='logo' src={logo}/>
        </Link>
    )
}

export default LogoHeader