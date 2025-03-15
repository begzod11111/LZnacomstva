import React, {useEffect, useState} from "react";
import classes from './avatarCt.module.css'
import UserAvatar from "../../../UI/avatar/userAvatar";
import axios from "axios";
import {Link} from "react-router-dom";
import Profile from "../../../profile/Profile";


function UserAvaCt(props) {
    const [fullname, setFullname] = useState("")
    const [image, setImage] = useState("")
    const payload = JSON.parse(localStorage.getItem('payload'))

    return (
        <Link to='/home/' className={classes.userAvaCt}>
            <UserAvatar src={payload.ava}/>
            <span>{payload.fullName}</span>
        </Link>
    )
}

export default UserAvaCt