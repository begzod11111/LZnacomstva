import React, {useEffect, useState} from "react";
import classes from './avatarCt.module.css'
import UserAvatar from "../../../UI/avatar/userAvatar";
import axios from "axios";
import {Link} from "react-router-dom";
import Profile from "../../../profile/Profile";


function UserAvaCt(props) {
    const [fullname, setFullname] = useState("")
    const [image, setImage] = useState("")

    return (
        <Link to='/home/' className={classes.userAvaCt}>
            <UserAvatar src={image}/>
            <span>{fullname}</span>
        </Link>
    )
}

export default UserAvaCt