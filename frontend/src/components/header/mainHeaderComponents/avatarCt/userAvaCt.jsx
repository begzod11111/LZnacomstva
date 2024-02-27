import React, {useEffect, useState} from "react";
import classes from './avatarCt.module.css'
import UserAvatar from "../../../UI/avatar/userAvatar";
import axios from "axios";
function UserAvaCt(props) {
    const [fullname, setFullname] = useState("")
    const [image, setImage] = useState("")
    useEffect(() => {
        axios.get(
            'http://127.0.0.1:8000/api/v1/accounts/me/',
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            }
        )
        .then(function (response) {
            setImage(response.data['images'][0]['image'])
            setFullname(response.data['full_name'])
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    return (
        <a className={classes.userAvaCt}>
            <UserAvatar src={image}/>
            <span>{fullname}</span>
        </a>
    )
}

export default UserAvaCt